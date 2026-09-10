const mongoose = require("mongoose");
const { genreSchema } = require("./genre");
const Joi = require("joi");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  genre: {
    type: genreSchema,
    required: true,
  },

  numberInStock: {
    type: Number,
    required: true,
    min: 0,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Movies = mongoose.model("Movies", movieSchema);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(255),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().required().min(0),
    dailyRentalRate: Joi.number().required().min(0),
  });

  return schema.validate(movie);
}

module.exports.Movies = Movies;

module.exports.validateMovie = validateMovie;
