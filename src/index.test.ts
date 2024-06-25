import request from "supertest";
import { describe, it, beforeEach } from "vitest";
import assert from "assert";

import app from './server';

describe('GET /', () => {
	beforeEach(() => {
		app.set('version', 'test');
		app.set('node_env', 'test');
	});

	it('should return the version/node_env based on config', async () => {
		const expectedVersion = "1.0.0";
		const expectedEnv = "test";
		app.set('version', expectedVersion);
		app.set('node_env', expectedEnv);
		const expectedResponse = { version: expectedVersion, node_env: expectedEnv };

		const response = await request(app).get('/').expect(200);

		assert.deepStrictEqual(response.body, expectedResponse);
	});

	it('should return default version/node_env if none is defined on environment', async () => {
		const defaultReponse = 'not defined';
		const expectedResponse = { version: defaultReponse, node_env: defaultReponse };
		app.set('version', undefined);
		app.set('node_env', undefined);

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
