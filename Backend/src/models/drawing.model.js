const { Schema } = mongoose;

const drawingSchema = new Schema({
  drawingName: String,
  drawing: Buffer,
  userId: String,
  favorite: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Drawing", drawingSchema);
