const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} = require("../utils/errors");

const User = require("../models/user");

// Get all users
const getUsers = (req, res) => {
  if (!req.user?._id)
    return res
      .status(UNAUTHORIZED)
      .send({ message: "Unauthorized to access resource!" });

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
const getUserById = (req, res) => {
  const { userId } = req.params;

  if (!req.user?._id)
    return res
      .status(UNAUTHORIZED)
      .send({ message: "Unauthorized to access resource!" });

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
  const data = req.body;

  if (!req.user?._id)
    return res
      .status(UNAUTHORIZED)
      .send({ message: "Unauthorized to access resource!" });

  return User.create(data)
    .then((result) => res.status(201).send(result))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      if (err.name === "ValidationError")
        return res.status(BAD_REQUEST).send({ message: "Invalid data passed" });

      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = { getUsers, getUserById, createUser };
