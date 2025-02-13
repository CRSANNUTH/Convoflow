import User from "../models/User.js";

export const getUsers = async (req, res) => {
	try {
		const userID = req.user._id;

		const otherUsers = await User.find({ _id: { $ne: userID } }).select(
			"-password"
		);

		res.status(200).json(otherUsers);
	} catch (error) {
		console.log("An Error Occurred while retrieving Users", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
