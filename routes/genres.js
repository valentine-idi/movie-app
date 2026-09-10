const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { Genres, validateObj } = require("../models/genre");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

router.get("/", [auth, admin], async (req, res, next) => {
  try {
    const genres = await Genres.find();
    res.send(genres);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const genre = await Genres.findById(id);
    if (!genre)
      return res.status(404).send(`Genre with an id ${id} was not found`);

    res.send(genre);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;

  const { error } = validateObj(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let genre = new Genres({ name });
    genre = await genre.save();
    res.send(genre);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateObj(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updatedGenre = await Genres.findByIdAndUpdate(
      req.params.id,
      req.body,
      { runValidators: true },
    );

    if (!updatedGenre) return res.status(404).send("Genre not found");

    res.send(updatedGenre);
  } catch (error) {
    res.status(500).send("Error While updating genre");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const genre = await Genres.findByIdAndDelete(req.params.id);

    if (!genre) return res.status(404).send("Genre not found");

    res.send(genre);
  } catch (error) {
    res.status(500).send("Error deleting file");
  }
});

module.exports = router;
