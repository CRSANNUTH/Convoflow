import Message from "../models/Message.js";
import User from "../models/User.js";
import Conversation from "../models/Conversation.js";
import { getReceiverSocketID, io } from "../socket/socket.js";

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatID } = req.params;
		const senderID = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderID, userToChatID] },
		}).populate("messages");

		if (!conversation) {
			return res.status(200).json([]);
		}

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("An Error Occurred retrieving messages", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverID } = req.params;
		const senderID = req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderID, receiverID] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderID, receiverID],
			});
		}

		const newMessage = new Message({
			senderID,
			receiverID,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		await Promise.all([conversation.save(), newMessage.save()]);

		const receiverSocketID = getReceiverSocketID(receiverID);
		if (receiverSocketID) {
			io.to(receiverSocketID).emit("newMessage", newMessage);
		}

		res.status(200).json({
			message: "Message Sent Successfully",
			newMessage,
		});
	} catch (error) {
		console.log("An Error Occurred while sending message", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
