// Dependencies
const express = require("express");

// Sub-Dependencies
const router = express.Router();

// Routes
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");

// External
const { NOT_FOUND } = require("../utils/errors");
const { createUser, login } = require("../controllers/users");

// Sign-in & Sign-up Routes
router.post("/signin", login);
router.post("/signup", createUser);

// Basic Routes
router.use("/users", userRoutes);
router.use("/items", itemRoutes);

// 404 Routing
router.use((req, res) => {
  res.status(NOT_FOUND).send({
    message: "Requested resource not found",
  });
});

module.exports = router;
