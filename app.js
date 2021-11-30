const express = require("express");
const {
    handleCustomErrors,
    handlePsqlErrors,
    handleServerErrors,
    handleContentError,
} = require("./errors/index.js");
const apiRouter = require("./routers/api.router.js");
const app = express();

app.use(express.json());

// TODO: Error handling.

app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.all("/*", handleContentError);
app.use(handleServerErrors);

module.exports = app;
