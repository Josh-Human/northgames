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
