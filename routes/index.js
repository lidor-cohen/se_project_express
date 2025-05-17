// Dependencies
const express = require("express");

// Sub-Dependencies
const router = express.Router();

// Routes
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");

// External
const { createUser, login } = require("../controllers/users");

const {
  validateLoginUser,
  validateCreateUser,
} = require("../middlewares/validation");

// Crash Test
router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// Sign-in & Sign-up Routes
router.post("/signin", validateLoginUser, login);
router.post("/signup", validateCreateUser, createUser);

// Basic Routes
router.use("/users", userRoutes);
router.use("/items", itemRoutes);

module.exports = router;
