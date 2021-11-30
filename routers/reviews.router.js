const {
    getReviewById,
    patchReviewById,
} = require("../controllers/reviews.controller");

const reviewRouter = require("express").Router();

reviewRouter.route("/:review_id").get(getReviewById).patch(patchReviewById);

module.exports = reviewRouter;
