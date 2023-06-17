const express = require("express");
const userController = require("../controllers/user.controller");

const userRouter = express.Router();

// GET user
userRouter.get("/users", userController.get);

// POST user
userRouter.post("/users", userController.post);

// UPDATE user
userRouter.put("/users/:id", userController.put);

// DELETE user
userRouter.delete("/users/:id", userController.del);

// LOGIN
userRouter.post("/users/login", userController.login);

// LOGOUT
userRouter.get("/users/logout", userController.logout);

// GET user stats
userRouter.get("/user/stats", userController.getUserStats);

// UPDATE user
userRouter.put(
  "/user/stats/increment-saved-to-device",
  userController.incrementSavedToDevice
);

userRouter.put(
  "/user/stats/increment-tutorials-watched",
  userController.incrementTutorialsWatched
);

module.exports = userRouter;
