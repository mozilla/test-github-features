import request from "supertest";
import { describe, it, beforeEach } from "vitest";
import assert from "assert";

import app from './server';

describe('GET /', () => {
	beforeEach(() => {
		app.set('version', 'test')
	});

	it('should return the version based on config', async () => {
		const expectedVersion = "1.0.0";
		app.set('version', expectedVersion);
		const expectedResponse = { version: expectedVersion };

		const response = await request(app).get('/').expect(200);

		assert.deepStrictEqual(response.body, expectedResponse);
	});

	it('should return default version if none is defined on environment', async () => {
		const expectedResponse = { version: "not defined" };
		app.set('version', undefined)

		const response = await request(app).get('/').expect(200);

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

	it("should return a custom response if the number is 10", async () => {
		const number = 10;
		const expectedResponse = { squareRoot: "Banana" };

		const response = await request(app).get(`/${number}`).expect(200);

		assert.deepStrictEqual(response.body, expectedResponse);
	});
});
