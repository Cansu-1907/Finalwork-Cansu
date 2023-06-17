const Achievement = require("../models/achievement.model");

async function get(req, res) {
  Achievement.find()
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

async function post(req, res) {
  const newAchievement = new Achievement(req.body);

  newAchievement
    .save()
    .then((newAchievement) => {
      return res.status(201).json({
        success: true,
        message: "successfully created",
        achievement: newAchievement,
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

  Achievement.findByIdAndRemove(id)
    .then((removedAchievement) => {
      if (!removedAchievement) {
        return res.status(404).json({
          success: false,
          message: "Achievement not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Achievement deleted successfully",
        achievement: removedAchievement,
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
  remove,
};
