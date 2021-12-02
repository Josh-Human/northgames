const { getUsers } = require("../controllers/users.controllers");
const { getUserById } = require("../controllers/users.controllers");

const userRouter = require("express").Router();

userRouter.route("/").get(getUsers);
userRouter.route("/:username").get(getUserById);
module.exports = userRouter;
