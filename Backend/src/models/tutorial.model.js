const { Schema } = mongoose;

const tutorialSchema = new Schema({
  tutorialName: String,
  video: Buffer,
  courseId: String,
  categoryId: String,
});

module.exports = mongoose.model("Tutorial", tutorialSchema);
