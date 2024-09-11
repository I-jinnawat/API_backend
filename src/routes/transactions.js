const express = require("express");
const router = express.Router();

const { create, list, update, remove } = require("../controllers/transactions");
router.get("/transaction", list);
router.put("/transaction/:id", update);
router.delete("/transaction/:id", remove);
router.post("/transaction", create);

module.exports = router;
