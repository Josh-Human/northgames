const {
    selectReviewById,
    updateReviewById,
    selectReviews,
    selectCommentsByReviewId,
    insertCommentByReviewId,
} = require("../models/reviews.model");
const {
    checkIfColumnExists,
    rejectNoContent,
    throwB,
    rejectBadRequest,
    checkDataValid,
} = require("../models/utils.model");

exports.getReviewById = (req, res, next) => {
    const { review_id } = req.params;
    selectReviewById(review_id)
        .then((review) => {
            if (review.length < 1) return rejectNoContent();
            res.status(200).send({ review: review[0] });
        })
        .catch(next);
};

exports.patchReviewById = (req, res, next) => {
    const { review_id } = req.params;
    const { inc_votes } = req.body;

    const allowedKeys = ["inc_votes"];

    if (
        !checkDataValid(allowedKeys, req.body) ||
        typeof inc_votes !== "number"
    ) {
        return rejectBadRequest("Invalid body.").catch(next);
    }

    updateReviewById(review_id, inc_votes)
        .then((review) => {
            if (review.length < 1) return rejectNoContent();
            res.status(200).send({ review: review[0] });
        })
        .catch(next);
};

exports.getReviews = (req, res, next) => {
    let { sort_by, order, category } = req.query;
    const allowedQuery = ["sort_by", "order", "category"];
    if (!checkDataValid(allowedQuery, req.query)) {
        return rejectBadRequest("Invalid query").catch(next);
    }
    if (!category) {
        selectReviews(sort_by, order, category)
            .then((reviews) => {
                if (reviews.length < 1) return rejectNoContent();
                res.status(200).send({ reviews });
            })
            .catch(next);
    } else {
        category = category.replace("'", "''");

        checkIfColumnExists("slug", "categories", category)
            .then(() => {
                return selectReviews(sort_by, order, category);
            })
            .then((reviews) => {
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

exports.postCommentByReviewId = (req, res, next) => {
    const { review_id } = req.params;
    const { username, body } = req.body;

    let allowedKeys = ["username", "body"];

    if (!checkDataValid(allowedKeys, req.body)) {
        return rejectBadRequest("Invalid body input.").catch(next);
    }
    if (Object.keys(req.body).length < 2) {
        return rejectBadRequest("Additional keys needed.").catch(next);
    }
    insertCommentByReviewId(review_id, username, body)
        .then((comment) => {
            res.status(201).send({ comment });
        })
        .catch(next);
};
