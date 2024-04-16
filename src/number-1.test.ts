import request from "supertest";
import { describe, it } from "vitest";
import assert from "assert";

import app from './server';

describe("GET /:number", () => {
	it("should return the square root of the number passed as the URL", async () => {
		const number = 9;
		const expectedResponse = 3;

		const response = await request(app).get(`/${number}`).expect(200);

		const {square_root } = response.body;
		assert.deepStrictEqual(square_root, expectedResponse);
	});
});
