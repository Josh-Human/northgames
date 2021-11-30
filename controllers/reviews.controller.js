const {
    selectReviewById,
    updateReviewById,
    selectReviews,
} = require("../models/reviews.model");
const { checkIfColumnExists } = require("../models/utils.model");

exports.getReviewById = (req, res, next) => {
    const { review_id } = req.params;
    selectReviewById(review_id)
        .then((review) => {
            res.status(200).send({ review });
        })
        .catch(next);
};

exports.patchReviewById = (req, res, next) => {
    const { review_id } = req.params;
    const keys = Object.keys(req.body);
    const key = keys[0];
    if (
        (keys.length !== 0 && key !== "inc_votes") ||
        (typeof req.body[key] !== "number" && keys.length !== 0) ||
        keys.length > 1
    ) {
        res.status(400).send({ msg: "Invalid input" });
    } else {
        const { inc_votes } = req.body;
        updateReviewById(review_id, inc_votes)
            .then((review) => {
                res.status(200).send({ review });
            })
            .catch(next);
    }
};

exports.getReviews = (req, res, next) => {
    const { sort_by } = req.query;
    selectReviews(sort_by).then((reviews) => {
        res.status(200).send({ reviews });
    });
};
