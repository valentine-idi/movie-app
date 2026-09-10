const errorHandling = require("../helperFunctions/errorHandling");

module.exports = function () {
  process.on("uncaughtException", (err) => {
    errorHandling("uncaughtException", err);
  });

  process.on("unhandledRejection", (err) => {
    errorHandling("umhandledRejection", err);
  });
};
