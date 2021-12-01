const db = require("../db/connection.js");

exports.deleteCommentsById = (comment_id) => {
    return db
        .query(
            `DELETE FROM comments
            WHERE comment_id = $1
            RETURNING *;`,
            [comment_id]
        )
        .then(({ rows }) => {
            if (rows.length < 1) {
                return Promise.reject({
                    status: 404,
                    msg: "Value does not exist.",
                });
            }
        });
};
