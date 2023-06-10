const { Schema } = mongoose;

const categorySchema = new Schema({
  categoryName: String,
  userId: String,
});

module.exports = mongoose.model("Category", categorySchema);
