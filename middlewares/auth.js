const jwt = require("jsonwebtoken");

const auth = function (req, res, next) {
  const token = req.headers["x-api-key"];
  if (!token) return res.status(401).send({ message: "Api key required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid token" });
  }
};

module.exports = auth;
