const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/categories", () => {
    it("200: returns all categories", () => {
        return request(app)
            .get("/api/categories")
            .expect(200)
            .then((response) => {
                expect(response.body.categories).toBeInstanceOf(Array);
                expect(response.body.categories.length).toBe(4);
                response.body.categories.forEach((category) => {
                    expect.objectContaining({
                        slug: expect.any(String),
                        description: expect.any(String),
                    });
                });
            });
    });
});
