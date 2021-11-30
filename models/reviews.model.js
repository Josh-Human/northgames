const db = require("../db/connection.js");
const reviewRouter = require("../routers/reviews.router.js");

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

exports.selectReviews = () => {};
