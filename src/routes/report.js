const express = require("express");
const router = express.Router();

const { read } = require("../controllers/report");

router.get("/report/:month", read);

module.exports = router;
