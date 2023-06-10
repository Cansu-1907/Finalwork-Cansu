mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });

module.exports.mongoose = mongoose;
