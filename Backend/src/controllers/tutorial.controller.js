const Tutorial = require("../models/tutorial.model");
/**
 * Get all courses from database
 * @returns json object about the status of the request
 */

async function get(req, res) {
  Tutorial.find()
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
 *   "tutorialName": "Tutorial 1",
 *   "video": tutorial.mp4,
 * }
 * @returns json object about the status of the request
 */

async function post(req, res) {
  const newTutorial = new Tutorial(req.body);
  newTutorial.courseId = req.params.courseId;

  newTutorial
    .save()
    .then((newTutorial) => {
      return res.status(201).json({
        success: true,
        message: "successfully created",
        tutorial: newTutorial,
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
 * Deletes an item from the database
 * @param req - id: ex. 634706ed105d472160df3ae7
 * @returns json object about the status of the request
 */

async function del(req, res, next) {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id)
    .exec()
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Successfully deleted",
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
 * Get tutorials by course id
 * @param req - courseId: ex. 634706ed105d472160df3ae7
 * @returns json object about the status of the request
 */

async function getByCourseId(req, res) {
  const courseId = req.params.courseId;

  Tutorial.find({
    courseId: { $in: [mongoose.Types.ObjectId(courseId)] },
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

module.exports = {
  get,
  post,
  del,
  getByCourseId,
};
