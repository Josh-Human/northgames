const db = require("../db/connection.js");

// use count in select and join
// use alias for lines 28-30 top rename the count to be comment_count

exports.selectReviewById = (id) => {
    if (Number.isNaN(id)) {
        console.log("Here");
        return Promise.reject({ status: 400, msg: "Invalid review_id." });
    }
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
            review.comment_count = Number(comment_count.rows[0].count);
            return [review];
        });
};
