const express = require("express");
const router = express.Router();
const ExpressError = require("../expressError");
const middleware = require("../middleware");
const items = require("../fakeDb");

router.get("/", (req, res) => {
	return res.json(items);
});

router.post("/", (req, res) => {
	if (!req.body.name) throw new ExpressError("'name' is required", 400);
	if (!req.body.price) throw new ExpressError("'price' is required", 400);
	const { name, price } = req.body;
	items.push({ name, price });
	return res.status(201).json({ added: { name, price } });
});

router.get("/:name", middleware.findItem, (req, res) => {
	return res.json(req.foundItem);
});

router.patch("/:name", middleware.findItem, (req, res) => {
	req.foundItem.name = req.body.name;
	req.foundItem.price = req.body.price;
	return res.json({ updated: req.foundItem });
});

router.delete("/:name", middleware.findItem, (req, res) => {
	items.splice(req.foundItemIdx, 1);
	return res.json({ message: "Deleted" });
});

module.exports = router;
