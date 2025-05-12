const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");
const {
  InternalServerError,
  NotFoundError,
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} = require("../utils/errors/index");
const User = require("../models/user");

// Get a user by id
const getCurrentUser = (req, res, next) =>
  User.findById(req.user._id)
    .orFail()
    .then((result) => res.send(result))
    .catch((err) => {
      if (err.name === "CastError")
        next(new BadRequestError("ID format is invalid"));
      else if (err.name === "DocumentNotFoundError")
        next(new NotFoundError("User not found"));
      else next(new InternalServerError());
    });

// Update a user by id
const updateUser = (req, res, next) => {
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
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new BadRequestError("Invalid data passed"));
      } else if (err.name === "DocumentNotFoundError")
        next(new NotFoundError("User not found"));
      else next(new InternalServerError());
    });
};

// Create a user
const createUser = (req, res, next) => {
  const { email, password, name, avatar } = req.body;

  if (!password) return next(new BadRequestError("Invalid data passed"));

  return bcrypt.hash(password, 10).then((encryptedPassword) =>
    User.create({ email, password: encryptedPassword, name, avatar })
      .then((result) => res.status(201).send(result))
      .catch((err) => {
        if (err.name === "ValidationError")
          next(new BadRequestError("Invalid data passed"));
        else if (err.name === "MongoServerError")
          next(new ConflictError("Duplicate email found!"));
        else next(new InternalServerError());
      })
  );
};

// Login a user
const login = (req, res, next) =>
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
      if (err.message.includes("not provided"))
        next(new BadRequestError(err.message));
      else next(new UnauthorizedError("Unauthorized to access resource!"));
    });

module.exports = {
  getCurrentUser,
  createUser,
  login,
  updateUser,
};
