import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const env = dotenv.config();
dotenvExpand.expand(env);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: process.env.ORIGIN || "http://localhost:3000",
		methods: ["GET", "PUT", "POST", "DELETE"],
		credentials: true,
	},
});

const userSocketMap = {};

export const getReceiverSocketID = (receiverID) => {
	return userSocketMap[receiverID];
};

io.on("connection", (socket) => {
	const userID = socket.handshake.query.userID;
	userSocketMap[userID] = userID ? socket.id : null;

	io.emit("getOnlineUsers", Object.keys(userSocketMap));
	socket.on("disconnect", () => {
		delete userSocketMap[userID];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };
