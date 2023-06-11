const express = require("express");
const categoryController = require("../controllers/category.controller");

const categoryRouter = express.Router();

// GET category
categoryRouter.get("/categories", categoryController.get);

// POST category
categoryRouter.post("/categories", categoryController.post);

// UPDATE category
categoryRouter.put("/categories/:id", categoryController.update);

// DELETE category
// categoryRouter.delete("/categories/:id", categoryController.del);

module.exports = categoryRouter;
