const express = require("express");
const router = express.Router();

const { create, list } = require("../controllers/transactions");
router.get("/transaction", list);
router.post("/transaction", create);

module.exports = router;
