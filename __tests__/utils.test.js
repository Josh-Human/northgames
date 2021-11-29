const {
    formatUserData,
    formatCategoryData,
    formatReviewData,
    formatCommentData,
} = require("../db/utils/utils.js");

describe.only("formatCategoryData()", () => {
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
    it("return is an array of arrays", () => {});
    it("return is an array of arrays", () => {});
    it("input is not mutated", () => {});
    it("result and input different reference", () => {});
    it("returns result for array with multiple objects", () => {});
});
describe("formatReviewData()", () => {
    it("return is an array of arrays", () => {});
    it("return is an array of arrays", () => {});
    it("input is not mutated", () => {});
    it("result and input different reference", () => {});
    it("returns result for array with multiple objects", () => {});
});
describe("formatCommentData()", () => {
    it("return is an array of arrays", () => {});
    it("return is an array of arrays", () => {});
    it("input is not mutated", () => {});
    it("result and input different reference", () => {});
    it("returns result for array with multiple objects", () => {});
});
