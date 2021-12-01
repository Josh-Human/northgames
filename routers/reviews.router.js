const {
    getReviewById,
    patchReviewById,
    getReviews,
    getCommentsByReviewId,
} = require("../controllers/reviews.controller");

const reviewRouter = require("express").Router();

reviewRouter.route("/:review_id").get(getReviewById).patch(patchReviewById);
reviewRouter.route("/").get(getReviews);
reviewRouter.route("/:review_id/comments").get(getCommentsByReviewId);

module.exports = reviewRouter;
