const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
    },
    publishDate: {
      type: Date,
      required: true,
    },
  })
);

exports.Movie = Movie;
