const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },
  savedToGallery: {
    type: Number,
    default: 0,
  },
  savedToDevice: {
    type: Number,
    default: 0,
  },
  tutorialsWatched: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
