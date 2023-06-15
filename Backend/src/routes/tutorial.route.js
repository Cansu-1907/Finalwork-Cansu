const express = require("express");
const tutorialController = require("../controllers/tutorial.controller");

const tutorialRouter = express.Router();

// GET all tutorials
tutorialRouter.get("/tutorials", tutorialController.get);

// GET tutorials by categoryId
tutorialRouter.get(
  "/tutorials/category/:categoryId",
  tutorialController.getTutorialsByCategoryId
);

// POST a new tutorial
tutorialRouter.post("/tutorials", tutorialController.createTutorial);

// UPDATE update tutorial name
tutorialRouter.put("/tutorials/:id", tutorialController.update);

// DELETE a tutorial
tutorialRouter.delete("/tutorials/:id", tutorialController.remove);

module.exports = tutorialRouter;
