const express = require("express");
const apiRouter = require("./routers/api.router.js");
const app = express();

// TODO: Routers
// TODO: Controllers.
// TODO: Error handling.

app.use("/api", apiRouter);

module.exports = app;
