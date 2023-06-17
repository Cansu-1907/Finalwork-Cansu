const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");

/**
 * Get all the data from the database
 * @returns json object about the status of the request
 */

async function get(req, res) {
  User.find()
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: err.message,
      });
    });
}

/**
 * Creates a new item and adds it to the database
 * @param req
 * {
 *   "firstName": "Cansu",
 *   "lastName": "Bilal",
 *   "email": "cansu.bilal@student.ehb.be",
 *   "password": "pw"
 * }
 * @returns json object about the status of the request
 */

async function post(req, res) {
  const user = new User(req.body);

  user.password = await bcrypt.hash(user.password, 10);

  user
    .save()
    .then((newUser) => {
      return res.status(201).json({
        success: true,
        message: "successfully created",
        user: newUser,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: err.message,
      });
    });
}

/**
 * Updates an item from the database
 * @param req
 * {
 *   "firstName": "Cansu",
 *   "lastName": "Bilal",
 *   "email": "cansu.bilal@student.ehb.be",
 *   "password": "pw"
 * }
 * @returns json object about the status of the request
 */

async function put(req, res) {
  const id = req.params.id;
  const updateObject = req.body;

  User.findByIdAndUpdate(id, updateObject)
    .exec()
    .then(() => {
      return res.status(201).json({
        success: true,
        message: "successfully updated",
        user: updateObject,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: err.message,
      });
    });
}

/**
 * Deletes an item from the database
 * @param req - id: ex. 634706ed105d472160df3ae7
 * @returns json object about the status of the request
 */

async function del(req, res, next) {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .exec()
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Successfully deleted",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: err.message,
      });
    });
}

/**
 * This function looks into the database to see if the user exists
 * @param req - email & password
 * {
 *   "email": "cansu.bilal@student.ehb.be",
 *   "password": "pw"
 * }
 * @returns cookie(sessionId) & first name of the user
 */

async function login(req, res) {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .exec()
    .then(async (user) => {
      if (user == null) {
        return res.status(401).send("Invalid email or password");
      }

      if (await bcrypt.compare(password, user.password)) {
        const sessionId = uuid.v4();
        await sessions.set(sessionId, user);
        res.cookie("sessionId", sessionId, {
          secure: true,
          httpOnly: true,
          sameSite: "none",
        });
        console.log(sessions);
        return res.send({ loggedUser: user.firstName, role: user.role });
      } else {
        return res.status(401).send("Invalid email or password");
      }
    })
    .catch(() => {
      return res.status(500).send("Error occurred while trying to log in");
    });
}

/**
 * This function deletes the sessionId from the global Map: sessions
 * @param req - cookie(sessionId)
 * @returns string about the status of the request
 */

async function logout(req, res) {
  sessions.delete(req.cookies.sessionId);
  console.log(sessions);
  res.cookie("sessionId", "", {
    expires: new Date(Date(1)),
  });
  return res.status(200).send("Successfully logged out");
}

async function getUserStats(req, res) {
  const loggedUser = sessions.get(req.cookies.sessionId);

  User.findOne(
    { _id: loggedUser },
    "savedToGallery savedToDevice tutorialsWatched"
  )
    .exec()
    .then((userData) => {
      if (!userData) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.json(userData);
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: err.message,
      });
    });
}

async function incrementSavedToDevice(req, res) {
  const loggedUser = sessions.get(req.cookies.sessionId);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      loggedUser._id,
      { $inc: { savedToDevice: 1 } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function incrementTutorialsWatched(req, res) {
  const loggedUser = sessions.get(req.cookies.sessionId);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      loggedUser._id,
      { $inc: { tutorialsWatched: 1 } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json(updatedUser);
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
  get,
  post,
  put,
  del,
  login,
  logout,
  getUserStats,
  incrementSavedToDevice,
  incrementTutorialsWatched,
};
