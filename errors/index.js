exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    } else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
    if (err.code === "22P02") {
        res.status(400).send({ msg: "Invalid body." });
    } else if (err.code === "42703") {
        res.status(400).send({ msg: "Invalid sort_by query" });
    } else if (err.code === "42601") {
        res.status(400).send({ msg: "Invalid order query" });
    } else if (err.code === "23503") {
        if (err.constraint === "comments_review_id_fkey") {
            res.status(400).send({ msg: "Review does not exist." });
        } else {
            res.status(401).send({ msg: "Unregistered user." });
        }
    } else if (err.code === "23502") {
        res.status(400).send({ msg: "No content sent." });
    } else next(err);
};
exports.handleContentError = (err, req, res, next) => {
    console.log(err);
    res.status(404).send({ msg: "404 Not Found" });
};

exports.handleServerErrors = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
};
