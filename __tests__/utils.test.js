const {
    formatUserData,
    formatCategoryData,
    formatReviewData,
    formatCommentData,
} = require("../db/utils/utils.js");

describe("formatCategoryData()", () => {
    it("return is an array of arrays", () => {
        const input = [{ slug: "Check", description: "A real description" }];
        expect(formatCategoryData(input)).toBeInstanceOf(Array);
        expect(formatCategoryData(input)[0]).toBeInstanceOf(Array);
    });
    it("return has correct data", () => {
        const input = [{ slug: "Check", description: "A real description" }];
        expect(formatCategoryData(input)).toEqual([
            ["Check", "A real description"],
        ]);
    });
    it("input is not mutated", () => {
        const input = [{ slug: "Check", description: "A real description" }];
        expect(input).toEqual([
            { slug: "Check", description: "A real description" },
        ]);
    });
    it("result and input different reference", () => {
        const input = [{ slug: "Check", description: "A real description" }];
        expect(formatCategoryData(input)).not.toBe(input);
    });
    it("returns result for array with multiple objects", () => {
        const input = [
            { slug: "Check", description: "A real description" },
            { slug: "Different", description: "Real" },
        ];
        expect(formatCategoryData(input)).toEqual([
            ["Check", "A real description"],
            ["Different", "Real"],
        ]);
    });
});

describe("formatUserData()", () => {
    it("return is an array of arrays", () => {
        const input = [
            {
                username: "annie901",
                avatar_url: "https:www.google.com",
                name: "James",
            },
        ];
        expect(formatUserData(input)).toBeInstanceOf(Array);
        expect(formatUserData(input)[0]).toBeInstanceOf(Array);
    });
    it("return has correct data", () => {
        const input = [
            {
                username: "annie901",
                avatar_url: "https:www.google.com",
                name: "James",
            },
        ];
        expect(formatUserData(input)).toEqual([
            ["annie901", "https:www.google.com", "James"],
        ]);
    });
    it("input is not mutated", () => {
        const input = [
            {
                username: "annie901",
                avatar_url: "https:www.google.com",
                name: "James",
            },
        ];
        expect(input).toEqual([
            {
                username: "annie901",
                avatar_url: "https:www.google.com",
                name: "James",
            },
        ]);
    });
    it("result and input different reference", () => {
        const input = [
            {
                username: "annie901",
                avatar_url: "https:www.google.com",
                name: "James",
            },
        ];
        expect(formatUserData(input)).not.toBe(input);
    });
    it("returns result for array with multiple objects", () => {
        const input = [
            {
                username: "annie901",
                avatar_url: "https:www.google.com",
                name: "James",
            },
            {
                username: "karlx",
                avatar_url: "https:www.imdb.com",
                name: "Karl",
            },
        ];
        expect(formatUserData(input)).toEqual([
            ["annie901", "https:www.google.com", "James"],
            ["karlx", "https:www.imdb.com", "Karl"],
        ]);
    });
});

describe("formatReviewData()", () => {
    it("return is an array of arrays", () => {
        const input = [
            {
                title: "Hello",
                review_body: "Review",
                designer: "Design",
                review_img_url: "a link",
                votes: 5,
                category: 1,
                owner: 3,
                created_at: new Date(10),
            },
        ];
        expect(formatReviewData(input)).toBeInstanceOf(Array);
        expect(formatReviewData(input)[0]).toBeInstanceOf(Array);
    });
    it("return has correct data", () => {
        const input = [
            {
                title: "Hello",
                review_body: "Review",
                designer: "Design",
                review_img_url: "a link",
                votes: 5,
                category: 1,
                owner: 3,
                created_at: new Date(10).toString(),
            },
        ];
        expect(formatReviewData(input)).toEqual([
            [
                "Hello",
                "Review",
                "Design",
                "a link",
                5,
                1,
                3,
                "Thu Jan 01 1970 01:00:00 GMT+0100 (Greenwich Mean Time)",
            ],
        ]);
    });
    it("input is not mutated", () => {
        const input = [
            {
                title: "Hello",
                review_body: "Review",
                designer: "Design",
                review_img_url: "a link",
                votes: 5,
                category: 1,
                owner: 3,
                created_at: new Date(10),
            },
        ];
        expect(input).toEqual([
            {
                title: "Hello",
                review_body: "Review",
                designer: "Design",
                review_img_url: "a link",
                votes: 5,
                category: 1,
                owner: 3,
                created_at: new Date(10),
            },
        ]);
    });
    it("result and input different reference", () => {
        const input = [
            {
                title: "Hello",
                review_body: "Review",
                designer: "Design",
                review_img_url: "a link",
                votes: 5,
                category: 1,
                owner: 3,
                created_at: new Date(10),
            },
        ];
        expect(formatReviewData(input)).not.toBe(input);
    });
    it("returns result for array with multiple objects", () => {
        const input = [
            {
                title: "Hello",
                review_body: "Review",
                designer: "Design",
                review_img_url: "a link",
                votes: 5,
                category: 1,
                owner: 3,
                created_at: new Date(15).toString(),
            },
            {
                title: "Hello1",
                review_body: "Review1",
                designer: "Design1",
                review_img_url: "a link1",
                votes: 7,
                category: 2,
                owner: 4,
                created_at: new Date(15).toString(),
            },
        ];
        expect(formatReviewData(input)).toEqual([
            [
                "Hello",
                "Review",
                "Design",
                "a link",
                5,
                1,
                3,
                "Thu Jan 01 1970 01:00:00 GMT+0100 (Greenwich Mean Time)",
            ],
            [
                "Hello1",
                "Review1",
                "Design1",
                "a link1",
                7,
                2,
                4,
                "Thu Jan 01 1970 01:00:00 GMT+0100 (Greenwich Mean Time)",
            ],
        ]);
    });
});
