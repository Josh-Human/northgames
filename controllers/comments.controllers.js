const { deleteCommentsById } = require("../models/comments.models");
const { rejectForNoContent } = require("../models/utils.model");

exports.deleteCommentById = (req, res, next) => {
    const { comment_id } = req.params;
    deleteCommentsById(comment_id)
        .then((response) => {
            if (response.length < 1) {
                return rejectForNoContent();
            }
            res.status(204).send();
        })
        .catch(next);
};
