const apiRouter = require("express").Router();
const { getEndpoints } = require("../controllers/api.controllers.js");
const categoriesRouter = require("./categories.router.js");
const commentRouter = require("./comments.router.js");
const reviewRouter = require("./reviews.router.js");

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.route("/").get(getEndpoints);
module.exports = apiRouter;
