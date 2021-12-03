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
            return rows;
        });
};

exports.updateCommentById = (comment_id, inc_votes) => {
    return db
        .query(
            `UPDATE comments
            SET votes = votes + $1
            WHERE comment_id = $2
            RETURNING *;`,
            [inc_votes, comment_id]
        )
        .then(({ rows }) => {
            return rows[0];
        });
};
