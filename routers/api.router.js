const apiRouter = require("express").Router();
const categoriesRouter = require("./categories.router.js");
const reviewRouter = require("./reviews.router.js");

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewRouter);
module.exports = apiRouter;
