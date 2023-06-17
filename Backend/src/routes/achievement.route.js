const express = require("express");
const achievementController = require("../controllers/achievement.controller");

const achievementRouter = express.Router();

// GET achievements
achievementRouter.get("/achievements", achievementController.get);

// POST achievement
achievementRouter.post("/achievements", achievementController.post);

// DELETE a achievement
achievementRouter.delete("/achievements/:id", achievementController.remove);

module.exports = achievementRouter;
