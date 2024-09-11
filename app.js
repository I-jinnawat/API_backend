const express = require("express");
const { readdirSync } = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./src/config/connectDB");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));

readdirSync("./src/routes").map((r) =>
	app.use("/", require("./src/routes/" + r))
);

connectDB()
	.then(
		app.listen(port, () => {
			console.log(`http://localhost:${port}`);
		})
	)
	.catch((err) => {
		console.error(`Error connecting to database: ${err.message}`);
		process.exit(1);
	});
