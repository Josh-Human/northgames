exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    } else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
    if (err.code === "22P02") {
        res.status(400).send({ msg: "Invalid input" });
    } else if (err.code === "42703") {
        res.status(400).send({ msg: "Invalid sort_by query" });
    } else if (err.code === "42601") {
        res.status(400).send({ msg: "Invalid order query" });
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
