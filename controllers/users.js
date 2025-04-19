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

// Get all users
const getUsers = (req, res) => {
  return User.find({})
    .orFail()
    .then((result) => res.send(result))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// Get a user by id
const getCurrentUser = (req, res) => {
  return console.log(req.user);

  return User.findById(userId)
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
        return res
          .status(NOT_FOUND)
          .send({ message: `Clothing item not found` });

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
const login = (req, res) => {
  return User.findUserByCredentials({
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => {
      const token = jwt
        .sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        })
        .catch(() =>
          res
            .status(UNAUTHORIZED)
            .send({ message: "Unauthorized to access resource!" })
        );

      return res.send({ token });
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};

module.exports = { getUsers, getCurrentUser, createUser, login };
