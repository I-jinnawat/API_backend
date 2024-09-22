const Transactions = require("../models/transactions");

exports.read = async (req, res) => {
	try {
		const { month } = req.params;

		let query = {};

		if (month) {
			query = {
				dateOfused: { $exists: true, $ne: "" },
				$expr: {
					$eq: [
						{ $month: { $dateFromString: { dateString: "$dateOfused" } } },
						parseInt(month),
					],
				},
			};
		}

		const transactions = await Transactions.find(query).exec();

		let totalIncome = 0;
		let totalOutcome = 0;

		transactions.forEach((transaction) => {
			if (transaction.type === "income") {
				totalIncome += transaction.amount;
			} else if (transaction.type === "expense") {
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
