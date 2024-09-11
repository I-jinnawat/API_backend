const Transactions = require("../models/transactions");

exports.read = async (req, res) => {
	try {
		const { month } = req.params;

		let query = {};

		if (month) {
			query = {
				$expr: {
					$eq: [{ $month: "$date" }, parseInt(month)],
				},
			};
		}

		const transactions = await Transactions.find(query).exec();

		let totalIncome = 0;
		let totalOutcome = 0;

		transactions.forEach((transaction) => {
			if (transaction.type === "รายรับ") {
				totalIncome += transaction.amount;
			} else if (transaction.type === "รายจ่าย") {
				totalOutcome += transaction.amount;
			}
		});

		const balance = totalIncome - totalOutcome;

		res.status(200).json({
			transactions,
			summary: {
				totalIncome,
				totalOutcome,
				balance,
			},
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
