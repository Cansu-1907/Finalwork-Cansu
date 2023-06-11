const { Schema } = mongoose;

const tutorialSchema = new Schema({
  tutorialName: String,
  thumbnail: Buffer,
  videoUrl: String,
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

module.exports = mongoose.model("Tutorial", tutorialSchema);
