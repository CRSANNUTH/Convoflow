import mongoose from "mongoose";

const connectMongoDB = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGODB_URI);
		console.log(
			`MongoDB connected: ${connection.connection.host}:${connection.connection.port}`
		);
	} catch (error) {
		console.log("Error connecting to MongoDB: ", error);
		process.exit(1);
	}
};

export default connectMongoDB;
