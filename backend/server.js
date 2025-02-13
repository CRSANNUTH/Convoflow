import express from "express";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import connectMongoDB from "./db/connectMongoDB.js";
import { app, io, server } from "./socket/socket.js";

const env = dotenv.config();
dotenvExpand.expand(env);

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.Router());
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.ORIGIN || "http://localhost:3000",
		methods: ["GET", "PUT", "POST", "DELETE"],
		credentials: true,
	})
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
	connectMongoDB();
	console.log(`Server listening on port ${PORT}`);
});
