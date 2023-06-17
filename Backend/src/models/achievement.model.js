const { Schema } = mongoose;

const achievementSchema = new Schema({
  achievementName: { type: String, required: true },
  description: { type: String, required: true },
  backgroundColor: { type: String, required: true },
  trophy: { type: String, required: true },
  conditions: [
    {
      type: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Achievement", achievementSchema);
