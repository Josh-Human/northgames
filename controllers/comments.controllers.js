const { deleteCommentsById } = require("../models/comments.models");

exports.deleteCommentById = (req, res, next) => {
    const { comment_id } = req.params;
    deleteCommentsById(comment_id)
        .then(() => {
            res.status(204).send();
        })
        .catch(next);
};
