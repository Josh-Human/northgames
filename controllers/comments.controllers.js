const {
    deleteCommentsById,
    updateCommentById,
} = require("../models/comments.models");
const {
    rejectNoContent,
    checkDataValid,
    rejectBadRequest,
} = require("../models/utils.model");

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
    const allowedKeys = ["inc_votes"];
    if (!checkDataValid(allowedKeys, req.body)) {
        return rejectBadRequest("Invalid body.").catch(next);
    }
    updateCommentById(comment_id, inc_votes)
        .then((comment) => {
            if (comment.length < 1) return rejectNoContent();
            res.status(200).send({ comment: comment[0] });
        })
        .catch(next);
};
