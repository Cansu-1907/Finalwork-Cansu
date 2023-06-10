const express = require("express");
const tutorialController = require("../controllers/tutorial.controller");

const tutorialRouter = express.Router();

// GET category
tutorialRouter.get("/tutorials", tutorialController.get);
tutorialRouter.get("/tutorials/:courseId", tutorialController.getByCourseId);

// POST category
tutorialRouter.post("/tutorials/:courseId", tutorialController.post);

// DELETE category
tutorialRouter.delete("/tutorials/:id", tutorialController.del);

module.exports = tutorialRouter;
