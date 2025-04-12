const express = require("express");
const router = require("express").Router();
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const { NOT_FOUND } = require("../utils/errors");

// Auth Middleware
router.use((req, res, next) => {
  req.user = {
    _id: "67f82e5869b2ace88d714ef9",
  };
  next();
});

// JSON Middleware
router.use(express.json());

// Basic routes
router.use("/users", userRoutes);
router.use("/items", itemRoutes);

// 404 Routing
router.use((req, res) => {
  res.status(NOT_FOUND).send({
    message: "Requested resource not found",
  });
});

module.exports = router;
