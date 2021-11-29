const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");
const request = require("supertest");
const { response } = require("express");

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
describe("GET /api/reviews/:review_id", () => {
    it("200: returns review", () => {
        return request(app)
            .get("/api/reviews/2")
            .expect(200)
            .then((response) => {
                expect(response.body.review).toBeInstanceOf(Array);
                expect(response.body.review.length).toBe(1);
                expect(response.body.review).toEqual([
                    {
                        owner: "philippaclaire9",
                        title: "Jenga",
                        review_id: 2,
                        review_body: "Fiddly fun for all the family",
                        designer: "Leslie Scott",
                        review_img_url:
                            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
                        category: "dexterity",
                        created_at: new Date(1610964101251).toISOString(),
                        votes: 5,
                        comment_count: 3,
                    },
                ]);
            });
    });
    it("400: returns bad request when invalid param sent", () => {
        return request(app)
            .get("/api/reviews/dog")
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid input");
            });
    });
});
