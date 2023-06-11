const Tutorial = require("../models/tutorial.model");
/**
 * Get all tutorials from database
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

// Get tutorials by categoryId
async function getTutorialsByCategoryId(req, res) {
  const { categoryId } = req.params;

  try {
    const tutorials = await Tutorial.find({ categoryId });
    return res.json(tutorials);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}

// Create a new tutorial
async function createTutorial(req, res) {
  const { tutorialName, thumbnail, videoUrl } = req.body;
  console.log(req.body);
  try {
    const newTutorial = new Tutorial({
      tutorialName,
      thumbnail: Buffer.from(thumbnail, "base64"),
      videoUrl,
      categoryId: req.body.categoryId,
    });

    const savedTutorial = await newTutorial.save();
    return res.status(201).json(savedTutorial);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}

module.exports = {
  get,
  getTutorialsByCategoryId,
  createTutorial,
};
