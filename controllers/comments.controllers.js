const {
    deleteCommentsById,
    updateCommentById,
} = require("../models/comments.models");
const { rejectNoContent } = require("../models/utils.model");

exports.deleteCommentById = (req, res, next) => {
    const { comment_id } = req.params;
    deleteCommentsById(comment_id)
        .then((response) => {
            if (response.length < 1) {
                return rejectNoContent();
            }
            res.status(204).send();
        })
        .catch(next);
};

exports.patchCommentById = (req, res, next) => {
    const { comment_id } = req.params;
    const { inc_votes } = req.body;

    updateCommentById(comment_id, inc_votes)
        .then((comment) => {
            res.status(200).send({ comment });
        })
        .catch(next);
};
