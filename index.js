const express = require("express");
const app = express();
const logger = require("./logger/logger");

require("dotenv").config();
require("./startup/logging")();
require("./startup/startup")(app);
require("./startup/db")();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
