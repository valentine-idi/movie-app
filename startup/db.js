const mongoose = require("mongoose");
const logger = require("../logger/logger");

const dbConnect = () => {
  mongoose
    .connect(process.env.DB)
    .then(() => logger.info("Connected to database"));
};

module.exports = dbConnect;
