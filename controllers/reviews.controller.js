const {
    selectReviewById,
    updateReviewById,
    selectReviews,
    selectCommentsByReviewId,
    insertCommentByReviewId,
} = require("../models/reviews.model");
const {
    checkIfColumnExists,
    rejectForNoContent,
    checkBodyKeys,
} = require("../models/utils.model");

exports.getReviewById = (req, res, next) => {
    const { review_id } = req.params;
    selectReviewById(review_id)
        .then((review) => {
            if (review.length < 1) return rejectForNoContent();
            res.status(200).send({ review });
        })
        .catch(next);
};

// 400
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
                if (review.length < 1) return rejectForNoContent();
                res.status(200).send({ review });
            })
            .catch(next);
    }
};

// 400
exports.getReviews = (req, res, next) => {
    let { sort_by, order, category } = req.query;
    let noError = true;
    let allowedKeys = ["sort_by", "order", "category"];
    let categoryQuery = undefined;
    for (let key of Object.keys(req.query)) {
        if (!allowedKeys.includes(key)) {
            res.status(400).send({ msg: "Invalid query" });
            noError = false;
        }
    }

    if (category) {
        categoryQuery = `category='${category}'`;
        categoryQuery = categoryQuery.replace("'s", "''s");
    }
    if (noError) {
        checkIfColumnExists("slug", "categories", category)
            .then(() => {
                return selectReviews(sort_by, order, categoryQuery);
            })
            .then((reviews) => {
                if (reviews.length < 1) return rejectForNoContent();

                res.status(200).send({ reviews });
            })
            .catch(next);
    }
};

exports.getCommentsByReviewId = (req, res, next) => {
    const { review_id } = req.params;
    checkIfColumnExists("review_id", "reviews", review_id)
        .then(() => {
            return selectCommentsByReviewId(review_id);
        })
        .then((comments) => {
            res.status(200).send({ comments });
        })
        .catch(next);
};

// 400
exports.postCommentByReviewId = (req, res, next) => {
    const { review_id } = req.params;
    const { username, body } = req.body;

    let allowedKeys = ["username", "body"];
    const check = Object.keys(req.body).every((key) =>
        allowedKeys.includes(key)
    );
    if (!check) {
        return checkBodyKeys().catch(next);
    } else {
        insertCommentByReviewId(review_id, username, body)
            .then((post) => {
                res.status(200).send({ post });
            })
            .catch(next);
    }
};
