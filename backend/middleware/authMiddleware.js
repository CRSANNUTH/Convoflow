import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		if (!token) {
			return res
				.status(401)
				.json({ message: "Unauthorized Access - No Token Provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (!decoded) {
			return res
				.status(401)
				.json({ message: "Unauthorized Access - Invalid Token" });
		}

		const user = await User.findById(decoded.userID).select("-password");

		if (!user) {
			return res
				.status(401)
				.json({ message: "Unauthorized Access - User Not Found" });
		}

		req.user = user;
		next();
	} catch (error) {
		console.log(
			"An Error Occurred while authenticating user",
			error.message
		);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export default authMiddleware;
