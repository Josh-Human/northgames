const {
    getReviewById,
    patchReviewById,
    getReviews,
} = require("../controllers/reviews.controller");

const reviewRouter = require("express").Router();

reviewRouter.route("/:review_id").get(getReviewById).patch(patchReviewById);
reviewRouter.route("/").get(getReviews);
module.exports = reviewRouter;
