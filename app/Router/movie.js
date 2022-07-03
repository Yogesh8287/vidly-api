const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Movie } = require("../Model/Movie");
const { Genre } = require("../Model/genre");
const router = express.Router();

router.get("/", async (req, res) => {
  throw new Error();
  const result = await Movie.find();
  res.send(result);
});

router.post("/", [auth, admin], async (req, res) => {
  const { genreId } = req.body;
  const genre = await Genre.findById(genreId);
  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    publishDate: req.body.publishDate,
  });
  await movie.save();
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send("Movie not found");
  const genre = await Genre.findById(req.body.id);
  movie.title = req.body.title;
  movie.genre = {
    _id: genre._id,
    name: genre.name,
  };
  movie.numberInStock = req.body.numberInStock;
  movie.dailyRentalRate = req.body.dailyRentalRate;
  movie.publishDate = req.body.publishDate;
  await movie.save();
  res.send(movie);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const movie = await Movie.findByIdAndRemove({ _id: req.params.id });
  if (!movie) return res.status(404).send("Movie not found");
  res.send(movie);
});

module.exports = router;
