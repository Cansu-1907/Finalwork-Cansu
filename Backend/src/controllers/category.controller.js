const Category = require("../models/category.model");
// const Course = require("../models/course.model");
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
 * @param req - cookie
 * Get all categories from logged in user
 * @returns json object about the status of the request
 */

async function getMyCategories(req, res) {
  const loggedUser = sessions.get(req.cookies.sessionId);
  const loggedUserId = loggedUser._id;

  Category.find({
    userId: { $in: [mongoose.Types.ObjectId(loggedUserId)] },
  })
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

/**
 * Delete category, if category has courses -> delete also courses
 * @param req - id: ex. 634706ed105d472160df3ae7
 * @returns json object about the status of the request
 */

// async function del(req, res, next) {
//   const id = req.params.id;

//   Course.deleteMany({
//     categoryId: { $in: [mongoose.Types.ObjectId(id)] },
//   }).then(() =>
//     Tutorial.deleteMany({
//       categoryId: { $in: [mongoose.Types.ObjectId(id)] },
//     }).then(() => {
//       Category.findByIdAndRemove(id)
//         .exec()
//         .then(() => {
//           return res.status(200).json({
//             success: true,
//             message: "Successfully deleted",
//           });
//         })
//         .catch((err) => {
//           return res.status(500).json({
//             success: false,
//             message: "Something went wrong",
//             error: err.message,
//           });
//         });
//     })
//   );
// }

module.exports = {
  get,
  post,
  // del,
  getMyCategories,
};
