const express = require("express");
const drawingController = require("../controllers/drawing.controller");

const drawingRouter = express.Router();

// POST drawing
drawingRouter.post("/drawing", drawingController.createDrawing);

// GET all drawings for logged-in user
drawingRouter.get("/drawings", drawingController.getAllDrawings);

// PUT toggle favorite status
drawingRouter.put(
  "/drawings/:drawingId/toggle-favorite",
  drawingController.toggleFavorite
);

module.exports = drawingRouter;
