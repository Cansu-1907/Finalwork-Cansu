// Import npm packages
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

// Declare global variables that are used in multiple files
global.mongoose = require("mongoose");
global.sessions = new Map();

// Import routers
const userRouter = require("./src/routes/user.route");
const categoryRouter = require("./src/routes/category.route");
const tutorialRouter = require("./src/routes/tutorial.route");
const drawingRouter = require("./src/routes/drawing.route");

// Import values that are stored in .env file (PORT, MONGODB_URI)
const dotenv = require("dotenv").config();

// Import Database
const db = require("./src/configs/db");

// Set the port to the port that is declared in the .env file or 4000 as fallback
const port = process.env.PORT || 4000;

// Middleware
app.use(cors({ credentials: true, origin: "http://127.0.0.1:5500" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", tutorialRouter);
app.use("/api", drawingRouter);

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`http://localhost:${port}`);
});
