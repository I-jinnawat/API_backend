const Transactions = require("../models/transactions");
exports.list = async (req, res, next) => {
	try {
		const { month } = req.query;
		let query = {};

		if (month) {
			query = {
				$expr: {
					$eq: [{ $month: "$date" }, parseInt(month)],
				},
			};
		}

		const transactions = await Transactions.find(query).exec();
		res.status(200).json(transactions);
	} catch (e) {
		console.error(e);
		res.status(500).json({ message: "An error occurred" });
	}
};

exports.create = async (req, res, next) => {
	try {
		const { type, name, amount, date } = req.body;
		const transaction = await Transactions.create({ type, name, amount, date });
		res
			.status(201)
			.json({ message: "Transaction created", transaction: transaction });
	} catch (e) {
		console.log(e);
		if (e.name === "ValidationError") {
			res.status(400).json({
				message: "Validation Error",
				details: e.errors,
			});
		} else {
			console.error(e);
			res.status(500).json({ message: "An error occurred" });
		}
	}
};

exports.update = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { type, name, amount, date } = req.body;
		const updatedTransaction = await Transactions.findByIdAndUpdate(
			id,
			{ type, name, amount, date },
			{ new: true }
		).exec();
		res.status(200).json(updatedTransaction);
	} catch (e) {
		console.error(e);
		res.status(500).json({ message: "An error occurred" });
	}
};
exports.remove = async (req, res, next) => {
	try {
		const { id } = req.params;

		const updatedTransaction = await Transactions.findOneAndDelete(id);
		res.status(200).json(updatedTransaction);
	} catch (e) {
		console.error(e);
		res.status(500).json({ message: "An error occurred" });
	}
};
