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
});

module.exports = mongoose.model("User", userSchema);
