const { getReviewById } = require("../controllers/reviews.controller");

const reviewRouter = require("express").Router();

reviewRouter.route("/:review_id").get(getReviewById);

module.exports = reviewRouter;
