const db = require("../db/connection.js");
const reviewRouter = require("../routers/reviews.router.js");
const format = require("pg-format");
const { rejectNoContent } = require("./utils.model.js");

exports.selectReviewById = (review_id) => {
    return db
        .query(
            `SELECT reviews.review_id, title, review_body, designer, 
            review_img_url, reviews.votes, category, owner, reviews.created_at,
            COUNT(comments.comment_id)::INT AS comment_count
            FROM REVIEWS
            LEFT JOIN comments ON reviews.review_id = comments.review_id
            WHERE reviews.review_id = $1
            GROUP BY reviews.review_id;`,
            [review_id]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.updateReviewById = (review_id, inc_votes) => {
    return db
        .query(
            `UPDATE reviews
    SET votes = votes + $1
    WHERE review_id = $2
    RETURNING *;`,
            [inc_votes, review_id]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.selectReviews = (
    sort_by = "created_at",
    order = "DESC",
    category = "%"
) => {
    return db
        .query(
            format(
                `SELECT reviews.review_id, title, review_body, designer, 
                review_img_url, reviews.votes, category, owner, reviews.created_at,
                COUNT(comments.comment_id) AS comment_count
                FROM REVIEWS
                LEFT JOIN comments ON reviews.review_id = comments.review_id
                WHERE category LIKE '%s'
                GROUP BY reviews.review_id
                ORDER BY reviews.%I %s;`,
                category,
                sort_by,
                order.toUpperCase()
            )
        )
        .then(({ rows }) => {
            const returnArray = [];
            rows.forEach((review) => {
                review.comment_count = parseInt(review.comment_count);
                returnArray.push(review);
            });
            return returnArray;
        });
};

exports.selectCommentsByReviewId = (id) => {
    return db
        .query(
            `SELECT comment_id, votes,created_at,author,body 
        FROM comments
        WHERE review_id = $1;`,
            [id]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.insertCommentByReviewId = (review_id, username, body) => {
    const dateCreated = new Date(Date.now()).toISOString();
    if (typeof body !== "string") {
        return Promise.reject({ status: 400, msg: "Invalid post body." });
    }
    return db
        .query(
            `INSERT INTO comments(author,body,created_at, review_id)
        VALUES($1,$2,$3::Date,$4)
        RETURNING *;`,
            [username, body, dateCreated, review_id]
        )
        .then(({ rows }) => {
            return rows[0].body;
        });
};
