const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
	{
		type: { type: String, enum: ["รายรับ", "รายจ่าย"], required: true }, // ประเภท รายรับ/รายจ่าย
		name: { type: String, required: true }, // ชื่อรายการ
		amount: { type: Number, required: true }, // จำนวน
		date: { type: Date, required: true }, // วันที่ใช้จ่าย
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("transactions", transactionSchema);
