import request from "supertest";
import { describe, it } from "vitest";
import app from "./server";
import assert from "assert";
describe("GET /:number", () => {
	it("should return the square root of the number passed as the URL", async () => {
		const number = 9;
		const expectedResponse = { square_root: 3 };

		const response = await request(app).get(`/${number}`).expect(200);

		assert.deepStrictEqual(response.body, expectedResponse);
	});
});
