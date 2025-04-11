const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;
const app = express();

const userRoutes = require("./routes/users");
const itemRoutes = require("./routes/clothingItems");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.get("/", (req, res) => {
  res.send("<h1>WORKS</h1>");
});

app.use(express.json());
app.use("/users", userRoutes);
app.use("/items", itemRoutes);

// 404 Middleware
app.use((req, res, next) => {
  res.status(404).send({
    message: "Requested resource not found",
  });
});

app.listen(PORT, () => {
  console.log(PORT);
});
