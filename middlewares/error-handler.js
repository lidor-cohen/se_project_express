const errorHandler = (err, req, res, next) => {
  console.error(
    `Error ${err.name} with the message ${err.message} has occurred while executing the code`
  );

  res.status(err.statusCode || 500).send({
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
