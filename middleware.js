const ExpressError = require("./expressError");

function findItem(req, res, next) {
	if (req.method === "DELETE") {
		const foundItemIdx = items.findIndex((i) => i.name === req.params.name);
		if (foundItemIdx === -1) throw new ExpressError("Item Not Found", 404);
		req.foundItemIdx = foundItemIdx;
		return next();
	}
	const foundItem = items.find((i) => i.name === req.params.name);
	if (!foundItem) throw new ExpressError("Item Not Found", 404);
	req.foundItem = foundItem;
	return next();
}

module.exports = { findItem };
