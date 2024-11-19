const express = require("express");
const ExpressError = require("./expressError");
const itemRoutes = require("./routes/items");

const app = express();

app.use(express.json());
app.use("/items", itemRoutes);

app.use((req, res, next) => {
	throw new ExpressError("Page Not Found", 404);
});

app.use((err, req, res, next) => {
	let status = err.status || 500;
	return res.status(status).json({ error: { message: err.message, status } });
});

module.exports = app;
