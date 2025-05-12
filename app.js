const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/error-handler");
const routes = require("./routes/index");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").then(() => {
  console.log("Database Connected!");
});

// Use JSON middleware
app.use(cors());
app.use(express.json());

// Use custom winston logger
app.use(requestLogger);

// Use routes
app.use(routes);

// Use custom winston error logger
app.use(errorLogger);

// Use error handler
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listens on port ${PORT}`);
});
