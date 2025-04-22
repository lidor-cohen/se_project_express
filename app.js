const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes/index");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").then(() => {
  console.log("Database Connected!");
});

// Use JSON middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server listens on port ${PORT}`);
});
