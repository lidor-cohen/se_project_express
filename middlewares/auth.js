const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer"))
    return res
      .status(UNAUTHORIZED)
      .send({ message: "Unauthorized to access resource!" });

  const token = authorization.split(" ")[1];

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    return res
      .status(UNAUTHORIZED)
      .send({ message: "Unauthorized to access resource!" });
  }

  req.user = payload;
  return next();
};
