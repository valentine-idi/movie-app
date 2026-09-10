const logger = require("../logger/logger");

function errorhandler(err, req, res, next) {
  //log error
  logger.error(err.message);

  res.status(500).send({ message: "Something failed" });
}

module.exports = errorhandler;
