const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");
const request = require("supertest");
const { response } = require("express");
const { expect } = require("@jest/globals");

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
    it("200: returns review object for reviewed game", () => {
        return request(app)
            .get("/api/reviews/2")
            .expect(200)
            .then((response) => {
                expect(response.body.review).toBeInstanceOf(Object);
                expect(Object.keys(response.body).length).toBe(1);
                expect(response.body.review).toEqual({
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
                });
            });
    });
    it("400: returns bad request when invalid param sent", () => {
        return request(app)
            .get("/api/reviews/dog")
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid parameter.");
            });
    });
    it("404: returns no content when id out of range is sent", () => {
        return request(app)
            .get("/api/reviews/10000")
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe("Value does not exist");
            });
    });
});

describe("PATCH /api/reviews/:review_id", () => {
    it("200: returns review object for reviewed game", () => {
        return request(app)
            .patch("/api/reviews/2")
            .send({ inc_votes: 5 })
            .expect(200)
            .then((response) => {
                expect(response.body.review).toBeInstanceOf(Object);
                expect(Object.keys(response.body).length).toBe(1);
                expect(response.body.review).toEqual({
                    owner: "philippaclaire9",
                    title: "Jenga",
                    review_id: 2,
                    review_body: "Fiddly fun for all the family",
                    designer: "Leslie Scott",
                    review_img_url:
                        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
                    category: "dexterity",
                    created_at: new Date(1610964101251).toISOString(),
                    votes: 10,
                });
            });
    });
    it("400: returns bad request when invalid param sent", () => {
        return request(app)
            .patch("/api/reviews/dog")
            .send({ inc_votes: 5 })
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid parameter.");
            });
    });
    it("404: returns no content when id out of range is sent", () => {
        return request(app)
            .patch("/api/reviews/10000")
            .send({ inc_votes: 5 })
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe("Value does not exist");
            });
    });
    it("400: returns bad request when empty body sent", () => {
        return request(app)
            .patch("/api/reviews/2")
            .send({})
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid body.");
            });
    });
    it("400: returns bad request when object with invalid key sent", () => {
        return request(app)
            .patch("/api/reviews/2")
            .send({ a_value: 10 })
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid body.");
            });
    });
    it("400: returns bad request when object with invalid value sent", () => {
        return request(app)
            .patch("/api/reviews/2")
            .send({ inc_votes: "hello" })
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid body.");
            });
    });
    it("400: returns bad request when object with correct and invalid key sent", () => {
        return request(app)
            .patch("/api/reviews/2")
            .send({ inc_votes: 1, name: "Mitch" })
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid body.");
            });
    });
});

describe.only("GET /api/reviews", () => {
    it("200: returns review objects for reviewed game", () => {
        return request(app)
            .get("/api/reviews")
            .expect(200)
            .then((response) => {
                expect(response.body.reviews).toBeInstanceOf(Array);
                expect(response.body.reviews.length).toBe(10);
                response.body.reviews.forEach((review) => {
                    expect(review).toEqual(
                        expect.objectContaining({
                            owner: expect.any(String),
                            title: expect.any(String),
                            review_id: expect.any(Number),
                            category: expect.any(String),
                            review_img_url: expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            comment_count: expect.any(Number),
                        })
                    );
                });
            });
    });
    it("200: default to sort by date in descending order", () => {
        return request(app)
            .get("/api/reviews")
            .expect(200)
            .then((response) => {
                expect(response.body.reviews).toBeInstanceOf(Array);
                expect(response.body.reviews.length).toBeGreaterThan(0);
                expect(response.body.reviews).toBeSorted({
                    key: "created_at",
                    descending: true,
                });
            });
    });
    it("200: sort by other columns", () => {
        return request(app)
            .get("/api/reviews?sort_by=designer")
            .expect(200)
            .then((response) => {
                expect(response.body.reviews).toBeInstanceOf(Array);
                expect(response.body.reviews.length).toBeGreaterThan(0);
                expect(response.body.reviews).toBeSorted({
                    key: "designer",
                    descending: true,
                });
            });
    });

    it("200: sort by ascending", () => {
        return request(app)
            .get("/api/reviews?order=asc")
            .expect(200)
            .then((response) => {
                expect(response.body.reviews).toBeInstanceOf(Array);
                expect(response.body.reviews.length).toBeGreaterThan(0);
                expect(response.body.reviews).toBeSorted({
                    key: "created_at",
                    ascending: true,
                });
            });
    });
    it("200: can sort by category", () => {
        return request(app)
            .get("/api/reviews?category=dexterity")
            .expect(200)
            .then((response) => {
                expect(response.body.reviews).toBeInstanceOf(Array);
                expect(response.body.reviews.length).toBe(1);
                response.body.reviews.forEach((review) => {
                    expect(review).toEqual(
                        expect.objectContaining({
                            owner: expect.any(String),
                            title: expect.any(String),
                            review_id: expect.any(Number),
                            category: "dexterity",
                            review_img_url: expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            comment_count: expect.any(Number),
                        })
                    );
                });
            });
    });
    it("200: can limit number of pages", () => {
        return request(app)
            .get("/api/reviews?limit=5")
            .expect(200)
            .then((response) => {
                expect(response.body.reviews).toBeInstanceOf(Array);
                expect(response.body.reviews.length).toBe(5);
                response.body.reviews.forEach((review) => {
                    expect(review).toEqual(
                        expect.objectContaining({
                            owner: expect.any(String),
                            title: expect.any(String),
                            review_id: expect.any(Number),
                            category: expect.any(String),
                            review_img_url: expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            comment_count: expect.any(Number),
                        })
                    );
                });
            });
    });
    it("200: returns all if limit is larger than data", () => {
        return request(app)
            .get("/api/reviews?limit=5000")
            .expect(200)
            .then((response) => {
                expect(response.body.reviews).toBeInstanceOf(Array);
                expect(response.body.reviews.length).toBe(13);
                response.body.reviews.forEach((review) => {
                    expect(review).toEqual(
                        expect.objectContaining({
                            owner: expect.any(String),
                            title: expect.any(String),
                            review_id: expect.any(Number),
                            category: expect.any(String),
                            review_img_url: expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            comment_count: expect.any(Number),
                        })
                    );
                });
            });
    });
    xit("200: returns all if limit is larger than data", () => {
        return request(app)
            .get("/api/reviews?")
            .expect(200)
            .then((response) => {
                expect(response.body.reviews).toBeInstanceOf(Array);
                expect(response.body.reviews.length).toBe(13);
                response.body.reviews.forEach((review) => {
                    expect(review).toEqual(
                        expect.objectContaining({
                            owner: expect.any(String),
                            title: expect.any(String),
                            review_id: expect.any(Number),
                            category: expect.any(String),
                            review_img_url: expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            comment_count: expect.any(Number),
                        })
                    );
                });
            });
    });
    it("400: invalid query", () => {
        return request(app)
            .get("/api/reviews?nonsense=dexterity&order=asc")
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid query");
            });
    });
    it("400: invalid sort_by", () => {
        return request(app)
            .get("/api/reviews?sort_by=nonsense")
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid sort_by query");
            });
    });
    it("400: invalid order", () => {
        return request(app)
            .get("/api/reviews?order=somense")
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid order query");
            });
    });
    it("404: invalid category", () => {
        return request(app)
            .get("/api/reviews?category=nothing")
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe("Value does not exist");
            });
    });
    it("200: category with no reviews", () => {
        return request(app)
            .get("/api/reviews?category=children's games")
            .expect(200)
            .then((response) => {
                expect(response.body.reviews).toEqual([]);
            });
    });
});

describe("GET /api/reviews/:review_id/comments", () => {
    it("200: returns array of comments for review id", () => {
        return request(app)
            .get("/api/reviews/2/comments")
            .expect(200)
            .then((response) => {
                expect(response.body.comments).toBeInstanceOf(Array);
                expect(response.body.comments.length).toBe(3);
                response.body.comments.forEach((comment) => {
                    expect(comment).toEqual(
                        expect.objectContaining({
                            comment_id: expect.any(Number),
                            votes: expect.any(Number),
                            created_at: expect.any(String),
                            author: expect.any(String),
                            body: expect.any(String),
                        })
                    );
                });
            });
    });

    it("200: returns empty array for review with no comments", () => {
        return request(app)
            .get("/api/reviews/1/comments")
            .expect(200)
            .then((response) => {
                expect(response.body.comments).toEqual([]);
            });
    });
    it("400: returns bad request when invalid param sent", () => {
        return request(app)
            .get("/api/reviews/dog/comments")
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid parameter.");
            });
    });
    it("404: returns no content when id out of range is sent", () => {
        return request(app)
            .get("/api/reviews/10000/comments")
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe("Value does not exist");
            });
    });
});

describe("POST /api/reviews/:review_id/comments", () => {
    it("201: returns posted comment", () => {
        return request(app)
            .post("/api/reviews/2/comments")
            .send({ username: "bainesface", body: "A real life comment!" })
            .expect(201)
            .then((response) => {
                expect(response.body.comment).toEqual("A real life comment!");
            });
    });
    it("401: user unknown when unregistered user", () => {
        return request(app)
            .post("/api/reviews/2/comments")
            .send({ username: "james", body: "A real life comment!" })
            .expect(401)
            .then((response) => {
                expect(response.body.msg).toEqual("Unregistered user.");
            });
    });
    it("400: returns bad request when invalid body key sent", () => {
        return request(app)
            .post("/api/reviews/2/comments")
            .send({ user: "bainesface", body: "A real life comment!" })
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid body input.");
            });
    });
    it("400: returns bad request when invalid id sent", () => {
        return request(app)
            .post("/api/reviews/dog/comments")
            .send({ username: "bainesface", body: "A real life comment!" })
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid parameter.");
            });
    });
    it("404: returns no content when id out of range is sent", () => {
        return request(app)
            .post("/api/reviews/2000/comments")
            .send({ username: "bainesface", body: "A real life comment!" })
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe("Value does not exist");
            });
    });
    it("400: bad request when empty object sent", () => {
        return request(app)
            .post("/api/reviews/2/comments")
            .send({})
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Additional keys needed.");
            });
    });
    it("400: bad request when object with only one key sent", () => {
        return request(app)
            .post("/api/reviews/2/comments")
            .send({ username: "bainesface" })
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Additional keys needed.");
            });
    });

    it("201: ignores unnecessary properties", () => {
        return request(app)
            .post("/api/reviews/2/comments")
            .send({
                username: "bainesface",
                body: "A real life comment!",
                votes: 6,
            })
            .expect(201)
            .then((response) => {
                expect(response.body.comment).toEqual("A real life comment!");
            });
    });
});

describe("DELETE /api/comments/:comment_id", () => {
    it("204: returns nothing on successful delete", () => {
        return request(app).delete("/api/comments/2").expect(204);
    });
    it("400: returns bad request when invalid param sent", () => {
        return request(app)
            .delete("/api/comments/dog")
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid parameter.");
            });
    });
    it("404: returns no content when id out of range is sent", () => {
        return request(app)
            .delete("/api/comments/4000")
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe("Value does not exist");
            });
    });
});
describe("GET /api", () => {
    it("200: returns json of containing correctly formatted objects", () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Object);
                expect(Object.keys(response.body).length).toBe(8);
                for (let endpoint in response.body) {
                    expect(response.body[endpoint]).toEqual({
                        description: expect.any(String),
                        queries: expect.any(Array),
                        exampleResponse: expect.any(Object),
                    });
                }
            });
    });
    it("200: returns correct json object", () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then((response) => {
                expect(response.body["GET /api/categories"]).toEqual({
                    description: "serves an array of all categories",
                    queries: [],
                    exampleResponse: {
                        categories: [
                            {
                                description:
                                    "Players attempt to uncover each other's hidden role",
                                slug: "Social deduction",
                            },
                        ],
                    },
                });
            });
    });
});

describe("GET /api/users", () => {
    it("200: returns array of user objects", () => {
        return request(app)
            .get("/api/users")
            .expect(200)
            .then((response) => {
                expect(response.body.users).toBeInstanceOf(Array);
                expect(response.body.users.length).toBe(4);
                response.body.users.forEach((user) => {
                    expect(user).toEqual(
                        expect.objectContaining({
                            username: expect.any(String),
                        })
                    );
                });
            });
    });
    it("200: returns correct objects", () => {
        return request(app)
            .get("/api/users")
            .expect(200)
            .then((response) => {
                expect(response.body.users[0]).toEqual({
                    username: "mallionaire",
                });
            });
    });
});

describe("GET /api/users/:username", () => {
    it("200: returns user object", () => {
        return request(app)
            .get("/api/users/mallionaire")
            .expect(200)
            .then((response) => {
                expect(response.body.user).toBeInstanceOf(Object);
                expect(response.body.user).toEqual({
                    username: "mallionaire",
                    avatar_url:
                        "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
                    name: "haz",
                });
            });
    });
    it("400: returns bad request when invalid param sent", () => {
        return request(app)
            .get("/api/users/10")
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid parameter.");
            });
    });
    it("404: returns no content when id out of range is sent", () => {
        return request(app)
            .get("/api/users/dog")
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe("Value does not exist");
            });
    });
});

describe("PATCH /api/comments/:comment_id", () => {
    it("200: returns new comment for comment", () => {
        return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: 5 })
            .expect(200)
            .then((response) => {
                expect(response.body.comment).toBeInstanceOf(Object);
                expect(Object.keys(response.body).length).toBe(1);
                expect(response.body.comment).toEqual({
                    comment_id: 1,
                    body: "I loved this game too!",
                    votes: 21,
                    author: "bainesface",
                    review_id: 2,
                    created_at: new Date(1511354613389).toISOString(),
                });
            });
    });
    it("400: returns bad request when invalid param sent", () => {
        return request(app)
            .patch("/api/comments/dog")
            .send({ inc_votes: 5 })
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid parameter.");
            });
    });
    it("404: returns no content when id out of range is sent", () => {
        return request(app)
            .patch("/api/comments/10000")
            .send({ inc_votes: 5 })
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe("Value does not exist");
            });
    });
    it("400: returns bad request when empty body sent", () => {
        return request(app)
            .patch("/api/comments/2")
            .send({})
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid body.");
            });
    });
    it("400: returns bad request when object with invalid key sent", () => {
        return request(app)
            .patch("/api/comments/2")
            .send({ a_value: 10 })
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid body.");
            });
    });
    it("400: returns bad request when object with invalid value sent", () => {
        return request(app)
            .patch("/api/comments/2")
            .send({ inc_votes: "hello" })
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid parameter.");
            });
    });
    it("400: returns bad request when object with correct and invalid key sent", () => {
        return request(app)
            .patch("/api/comments/2")
            .send({ inc_votes: 1, name: "Mitch" })
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("Invalid body.");
            });
    });
});
