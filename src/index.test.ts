import request from "supertest";
import { describe, it } from "vitest";
import app from "./server";
import assert from "assert";
describe('GET /', () => {
	it('should return default version if none is defined on environment', async () => {
		const expectedResponse = { version: "not defined on environment" };
		const response = await request(app).get('/').expect(200);
		assert.deepStrictEqual(response.body, expectedResponse);
	});

	it('should return the version defined on environment', async () => {
		const expectedVersion = "1.0.0";
		const expectedResponse = { version: expectedVersion };

		const newApp = (await import('./server')).default;
		newApp.set('version', expectedVersion);
		const response = await request(newApp).get('/').expect(200);
		assert.deepStrictEqual(response.body, expectedResponse);
	});
})
describe("GET /:number", () => {
	it("should return the square root of the number passed as the URL", async () => {
		const number = 9;
		const expectedResponse = 3;

		const response = await request(app).get(`/${number}`).expect(200);

		const {square_root } = response.body;

		assert.deepStrictEqual(square_root, expectedResponse);
	});
});
