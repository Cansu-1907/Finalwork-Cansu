const Drawing = require("../models/drawing.model");
const User = require("../models/user.model");

async function createDrawing(req, res) {
  const { drawingName, drawing } = req.body;
  const loggedUser = sessions.get(req.cookies.sessionId);

  try {
    const base64Data = drawing.replace(/^data:image\/\w+;base64,/, "");

    const newDrawing = new Drawing({
      drawingName,
      drawing: Buffer.from(base64Data, "base64"),
      userId: loggedUser._id,
    });

    const savedDrawing = await newDrawing.save();

    await User.findByIdAndUpdate(loggedUser._id, {
      $inc: { savedToGallery: 1 },
    });

    return res.status(201).json(savedDrawing);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function getAllDrawings(req, res) {
  const loggedUser = sessions.get(req.cookies.sessionId);

  try {
    const drawings = await Drawing.find({ userId: loggedUser._id });
    return res.status(200).json(drawings);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function toggleFavorite(req, res) {
  const { drawingId } = req.params;
  const loggedUser = sessions.get(req.cookies.sessionId);

  try {
    const drawing = await Drawing.findById(drawingId);

    if (!drawing) {
      return res
        .status(404)
        .json({ success: false, message: "Drawing not found" });
    }

    drawing.favorite = !drawing.favorite;
    const savedDrawing = await drawing.save();

    return res.status(200).json(savedDrawing);
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
  createDrawing,
  getAllDrawings,
  toggleFavorite,
};
