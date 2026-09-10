const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Movies, validateMovie } = require("../models/movies");
const { Genres } = require("../models/genre");

router.get("/", async (req, res) => {
  try {
    const movies = await Movies.find();
    res.send(movies);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movies.findById(id);
    if (!movie)
      return res.status(404).send(`Movie with an id ${id} was not found`);

    res.send(movie);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  try {
    const genre = await Genres.findById(req.body.genreId);
    if (!genre) return res.statur(404).send({ message: "Genre not found" });

    const { title, numberInStock, dailyRentalRate } = req.body;

    const movie = new Movies({
      title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock,
      dailyRentalRate,
    });

    const result = await movie.save();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.put("/", async (req, res) => {});

router.delete("/:id", async (req, res) => {
  try {
    const movie = await Movies.findByIdAndDelete(req.params.id);

    if (!movie) return res.status(404).send("Movie not found");

    res.send(movie);
  } catch (error) {
    res.status(500).send("Error deleting movie");
  }
});

module.exports = router;
