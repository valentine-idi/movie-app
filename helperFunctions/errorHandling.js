const logger = require("../logger/logger");

module.exports = function (type, error) {
  logger.error(type, {
    message: error.message,
    stack: error.stack,
  });

  logger.on("finish", () => {
    process.exit(1);
  });

  logger.end();
};
