const User = require("../models/user");

// Get all users
const getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.send(err));
};

// Get a user by id
const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.send(err));
};

// Create a user
const createUser = (req, res) => {
  const data = req.body;

  User.create(data)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

module.exports = { getUsers, getUserById, createUser };
