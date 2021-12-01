const db = require("../db/connection.js");
const reviewRouter = require("../routers/reviews.router.js");
const format = require("pg-format");
// use count in select and join
// use alias for lines 28-30 top rename the count to be comment_count

exports.selectReviewById = (id) => {
    return db
        .query(
            `SELECT * FROM reviews
            WHERE review_id = $1;`,
            [id]
        )
        .then((result) => {
            return Promise.all([
                result.rows[0],
                db.query(
                    `SELECT COUNT(*) FROM comments
            WHERE review_id = $1;`,
                    [id]
                ),
            ]);
        })
        .then(([review, comment_count]) => {
            if (!review) {
                return Promise.reject({
                    status: 404,
                    msg: "Value does not exist",
                });
            }
            review.comment_count = Number(comment_count.rows[0].count);
            return [review];
        });
};

exports.updateReviewById = (review_id, inc_votes) => {
    if (!inc_votes) {
        return db
            .query(
                `SELECT * FROM reviews
        WHERE review_id = $1`,
                [review_id]
            )
            .then((result) => {
                if (result.rows.length < 1) {
                    return Promise.reject({
                        status: 404,
                        msg: "Value does not exist",
                    });
                }
                return result.rows;
            });
    }

    return db
        .query(
            `UPDATE reviews
    SET votes = votes + $1
    WHERE review_id = $2
    RETURNING *;`,
            [inc_votes, review_id]
        )
        .then((result) => {
            if (result.rows.length < 1) {
                return Promise.reject({
                    status: 404,
                    msg: "Value does not exist",
                });
            }
            return result.rows;
        });
};

exports.selectReviews = (
    sort_by = "created_at",
    order = "DESC",
    category = "true"
) => {
    return db
        .query(
            format(
                `SELECT reviews.review_id, title, review_body, designer, 
            review_img_url, reviews.votes, category, owner, reviews.created_at,
            COUNT(comments.comment_id) AS comment_count
            FROM REVIEWS
            FULL OUTER JOIN comments ON reviews.review_id = comments.review_id
            WHERE %s
            GROUP BY reviews.review_id
            ORDER BY reviews.%I %s;`,
                category,
                sort_by,
                order.toUpperCase()
            )
        )
        .then(({ rows }) => {
            if (rows.length < 1) {
                return Promise.reject({ status: 400, msg: "404 No Files" });
            }
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
        if (!body) {
            return Promise.reject({ code: "23502" });
        }
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
