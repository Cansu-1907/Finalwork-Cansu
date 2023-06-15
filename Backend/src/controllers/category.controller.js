const Category = require("../models/category.model");
const Tutorial = require("../models/tutorial.model");

/**
 * Get all categories from database
 * @returns json object about the status of the request
 */

async function get(req, res) {
  Category.find()
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: err.message,
      });
    });
}

/**
 * Creates a new item and adds it to the database
 * @param req
 * {
 *   "categoryName": "Animals",
 * }
 * @returns json object about the status of the request
 */

async function post(req, res) {
  const newCategory = new Category(req.body);
  const loggedUser = sessions.get(req.cookies.sessionId);
  newCategory.userId = loggedUser._id;

  newCategory
    .save()
    .then((newCategory) => {
      return res.status(201).json({
        success: true,
        message: "successfully created",
        category: newCategory,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: err.message,
      });
    });
}

async function update(req, res) {
  const id = req.params.id;
  const updatedName = req.body.categoryName;

  Category.findByIdAndUpdate(id, { categoryName: updatedName }, { new: true })
    .then((updatedCategory) => {
      if (!updatedCategory) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Category updated successfully",
        category: updatedCategory,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: err.message,
      });
    });
}

async function remove(req, res) {
  const id = req.params.id;

  Tutorial.deleteMany({ categoryId: id })
    .then(() => {
      Category.findByIdAndRemove(id)
        .then((removedCategory) => {
          if (!removedCategory) {
            return res.status(404).json({
              success: false,
              message: "Category not found",
            });
          }
          return res.status(200).json({
            success: true,
            message: "Category and associated tutorials deleted successfully",
            category: removedCategory,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message,
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: err.message,
      });
    });
}

module.exports = {
  get,
  post,
  update,
  remove,
};
