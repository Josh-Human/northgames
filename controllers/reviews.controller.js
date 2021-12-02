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
    throwB,
    throwBadRequest,
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

exports.patchReviewById = (req, res, next) => {
    const { review_id } = req.params;
    const { inc_votes } = req.body;

    let allowedKeys = ["inc_votes"];
    const check = Object.keys(req.body).every((key) =>
        allowedKeys.includes(key)
    );

    if (!check || !inc_votes) {
        return throwBadRequest("Invalid body.").catch(next);
    }

    updateReviewById(review_id, inc_votes)
        .then((review) => {
            if (review.length < 1) return rejectForNoContent();
            res.status(200).send({ review });
        })
        .catch(next);
};

// 400
exports.getReviews = (req, res, next) => {
    let { sort_by, order, category } = req.query;
    const allowedKeys = ["sort_by", "order", "category"];
    const allowedDataType = { sort_by: "string" };

    let categoryQuery = undefined;
    const check = Object.keys(req.body).every((key) =>
        allowedKeys.includes(key)
    );

    if (!check || typeof inc_votes !== "number") {
        return throwBadRequest("Invalid body.").catch(next);
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
        return throwBadRequest().catch(next);
    } else {
        insertCommentByReviewId(review_id, username, body)
            .then((post) => {
                res.status(200).send({ post });
            })
            .catch(next);
    }
};
