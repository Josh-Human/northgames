const { deleteCommentsById } = require("../models/comments.models");

exports.deleteCommentById = (req, res, next) => {
    const { comment_id } = req.params;
    console.log("here");
    deleteCommentsById(comment_id)
        .then(() => {
            res.status(204).send();
        })
        .catch(next);
};
