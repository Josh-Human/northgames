const express = require("express");
const {
    handleCustomErrors,
    handlePsqlErrors,
    handleServerErrors,
} = require("./errors/index.js");
const apiRouter = require("./routers/api.router.js");
const app = express();

// TODO: Error handling.

app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
