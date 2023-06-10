const express = require("express");
const categoryController = require("../controllers/category.controller");

const categoryRouter = express.Router();

// GET category
categoryRouter.get("/categories", categoryController.get);
categoryRouter.get("/mycategories", categoryController.getMyCategories);

// POST category
categoryRouter.post("/categories", categoryController.post);

// DELETE category
// categoryRouter.delete("/categories/:id", categoryController.del);

module.exports = categoryRouter;
