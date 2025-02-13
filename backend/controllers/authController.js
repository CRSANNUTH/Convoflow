import User from "../models/User.js";
import bcrypt from "bcryptjs";
import {
	generateTokenAndSetCookie,
	clearCookie,
} from "../utils/generateTokenAndSetCookie.js";

const boyProfilePic = "https://avatar.iran.liara.run/public/boy?username=";
const girlProfilePic = "https://avatar.iran.liara.run/public/girl?username=";

export const login = async (req, res) => {
	const { inputField, password } = req.body;
	if (!inputField || !password) {
		return res.status(400).json({ message: "All fields are required" });
	}
	try {
		const user =
			(await User.findOne({ username: inputField })) ||
			(await User.findOne({ email: inputField }));
		if (!user) {
			return res.status(404).json({ message: "User Doesn't Exists" });
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(400).json({ message: "Invalid Password" });
		}

		await generateTokenAndSetCookie(user._id, res);
		res.status(201).json({
			_id: user._id,
			fullname: user.fullname,
			email: user.email,
			username: user.username,
			gender: user.gender,
			profilePic: user.profilePic,
			message: "Logged in Successfully",
		});
	} catch (error) {
		console.log("An Error Occurred while logging in", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const signup = async (req, res) => {
	const { fullname, email, username, password, confirmPassword, gender } =
		req.body;

	if (
		!fullname ||
		!email ||
		!username ||
		!password ||
		!confirmPassword ||
		!gender
	) {
		return res.status(400).json({ message: "All fields are required" });
	}

	if (password !== confirmPassword) {
		return res.status(400).json({ message: "Passwords do not match" });
	}

	if (gender !== "Male" && gender !== "Female") {
		return res
			.status(400)
			.json({ message: "Gender must be Male or Female" });
	}

	try {
		const oldUser1 = await User.findOne({ email });
		if (oldUser1) {
			return res
				.status(400)
				.json({ message: "User with entered email already exists" });
		}
		const oldUser2 = await User.findOne({ username });
		if (oldUser2) {
			return res
				.status(400)
				.json({ message: "User with entered username already exists" });
		}
		const profilePic =
			(gender === "Male" ? boyProfilePic : girlProfilePic) + username;
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const user = await User.create({
			fullname,
			email,
			username,
			password: hashedPassword,
			gender,
			profilePic,
		});
		if (user) {
			await user.save();
			await generateTokenAndSetCookie(user._id, res);
			res.status(201).json({
				_id: user._id,
				fullname: user.fullname,
				email: user.email,
				username: user.username,
				gender: user.gender,
				profilePic: user.profilePic,
				message: "User Created Successfully",
			});
		} else {
			res.status(400).json({ message: "Invalid User Data" });
		}
	} catch (error) {
		console.log("An Error Occurred while signing up", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const logout = async (req, res) => {
	try {
		await clearCookie(res);
		res.status(200).json({ message: "Logged Out Successfully" });
	} catch (error) {
		console.log("An Error Occurred while logging out", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
