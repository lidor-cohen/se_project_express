const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");

const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
  CONFLICT,
} = require("../utils/errors");
const User = require("../models/user");

// Get a user by id
const getCurrentUser = (req, res) =>
  User.findById(req.user._id)
    .orFail()
    .then((result) => res.send(result))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      if (err.name === "CastError")
        return res
          .status(BAD_REQUEST)
          .send({ message: "ID format is invalid" });

      if (err.name === "DocumentNotFoundError")
        return res.status(NOT_FOUND).send({ message: `User not found` });

      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });

// Update a user by id
const updateUser = (req, res) => {
  const updateProperties = {};
  if (req.body.name) updateProperties.name = req.body.name;
  if (req.body.avatar) updateProperties.avatar = req.body.avatar;

  return User.findByIdAndUpdate(req.user._id, updateProperties, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((result) => res.send(result))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      if (err.name === "CastError")
        return res
          .status(BAD_REQUEST)
          .send({ message: "ID format is invalid" });

      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data passed" });
      }

      if (err.name === "DocumentNotFoundError")
        return res.status(NOT_FOUND).send({ message: `User not found` });

      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// Create a user
const createUser = (req, res) => {
  const { email, password, name, avatar } = req.body;

  if (!password)
    return res.status(BAD_REQUEST).send({ message: "Invalid data passed" });

  return bcrypt.hash(password, 10).then((encryptedPassword) =>
    User.create({ email, password: encryptedPassword, name, avatar })
      .then((result) => res.status(201).send(result))
      .catch((err) => {
        console.error(
          `Error ${err.name} with the message ${err.message} has occurred while executing the code`
        );
        if (err.name === "ValidationError")
          return res
            .status(BAD_REQUEST)
            .send({ message: "Invalid data passed" });

        if (err.name === "MongoServerError")
          return res
            .status(CONFLICT)
            .send({ message: "Duplicate email found!" });

        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      })
  );
};

// Login a user
const login = (req, res) =>
  User.findUserByCredentials({
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.send({ token });
    })
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );

      if (err.message.includes("not provided"))
        return res.status(BAD_REQUEST).send({ message: err.message });

      return res
        .status(UNAUTHORIZED)
        .send({ message: "Unauthorized to access resource!" });
    });

module.exports = {
  getCurrentUser,
  createUser,
  login,
  updateUser,
};
