const express = require("express");
const cors = require("cors");

const {
    handleCustomErrors,
    handlePsqlErrors,
    handleServerErrors,
    handleContentError,
} = require("./errors/index.js");
const apiRouter = require("./routers/api.router.js");
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

// Regular controller that handles errors
app.all("/*", handleContentError);

// Error handlers
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
