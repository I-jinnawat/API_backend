const mongoose = require("mongoose");
require("dotenv").config();
const DB = process.env.DB_URL;

const connectDB = async () => {
	console.log("Connecting to database");
	try {
		await mongoose.connect(DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("DB connected");
	} catch (e) {
		console.error("Error connecting to database", e);
	}
};
module.exports = connectDB;
