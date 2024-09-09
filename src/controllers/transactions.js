const Transactions = require("../models/transactions");
exports.list = async (req, res, next) => {
	try {
		const transactions = await Transactions.find({}).exec();
		res.status(201).json(transactions);
	} catch (e) {
		console.error(e);
	}
};
exports.create = async (req, res, next) => {
	try {
		const { type, name, amount, date } = req.body;
		const transaction = await Transactions.create({ type, name, amount, date });
		res.status(201).json(transaction);
	} catch (e) {
		console.error(e);
	}
};
