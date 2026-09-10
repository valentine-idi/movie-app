const express = require("express");
const helmet = require("helmet");
const errorhandler = require("../middlewares/error");
const courseRoute = require("../routes/course");
const genreRoute = require("../routes/genres");
const customerRoute = require("../routes/customers");
const movieRoute = require("../routes/movies");
const userRouter = require("../routes/users");
const auth = require("../routes/auth");

module.exports = function (app) {
  app.use(express.json());

  //middleware
  // app.use()
  app.use(helmet());

  //routes
  app.use("/api/courses", courseRoute);
  app.use("/api/genres", genreRoute);
  app.use("/api/customers", customerRoute);
  app.use("/api/movies", movieRoute);
  app.use("/api/users", userRouter);
  app.use("/api/auth", auth);

  //errorhandler
  app.use(errorhandler);
};
