const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
	{
		dateOfused: { type: String },
		type: { type: String },
		title: { type: String },
		amount: { type: Number },
	},
	{ timestamps: true }
);
const TransactionModel =
	mongoose.models.Transaction ||
	mongoose.model("Transaction", TransactionSchema);

module.exports = TransactionModel;
