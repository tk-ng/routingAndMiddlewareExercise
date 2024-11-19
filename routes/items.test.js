const app = require("../app");
const request = require("supertest");
const items = require("../fakeDb");

let oil = { name: "Oil", price: 5.47 };

beforeEach(function () {
	items.push(oil);
});

afterEach(function () {
	items.length = 0;
});

describe("GET /items", function () {
	test("Get all items", async function () {
		const res = await request(app).get("/items");

		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual([oil]);
	});
});

describe("GET /items/:name", function () {
	test("Get an item", async function () {
		const res = await request(app).get(`/items/${oil.name}`);

		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual(oil);
	});

	test("Responds with 404 for getting an invalid item", async function () {
		const res = await request(app).get("/items/rice");

		expect(res.statusCode).toBe(404);
	});
});

describe("POST /items", function () {
	test("Create an item", async function () {
		const rice = { name: "rice", price: 9.99 };
		const res = await request(app).post("/items").send(rice);

		expect(res.statusCode).toBe(201);
		expect(res.body).toEqual({ added: rice });
		expect(items.length).toBe(2);
		expect(items).toContainEqual(rice);
	});

	test("Responds with 400 if name/price is missing", async function () {
		const res = await request(app).post("/items").send({});

		expect(res.statusCode).toBe(400);
		expect(items).not.toContainEqual({});
	});
});

describe("PATCH /items/:name", function () {
	test("Updating an item's name/price", async function () {
		const oil2 = { name: "oil2", price: 19.99 };
		const res = await request(app).patch(`/items/${oil.name}`).send(oil2);

		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ updated: oil2 });
		expect(items.length).toBe(1);
		expect(items).toContainEqual(oil2);
	});

	test("Responds with 404 for patching an invalid item", async function () {
		const res = await request(app).patch("/items/rice");

		expect(res.statusCode).toBe(404);
	});
});

describe("DELETE /items/:name", function () {
	test("Deleting an item", async function () {
		const res = await request(app).delete(`/items/${oil.name}`);

		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ message: "Deleted" });
		expect(items.length).toBe(0);
	});

	test("Responds with 404 for deleting an invalid item", async function () {
		const res = await request(app).delete("/items/rice");

		expect(res.statusCode).toBe(404);
	});
});
