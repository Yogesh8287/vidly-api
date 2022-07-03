const express = require("express");
const router = express.Router();
const { Rentals } = require("../Model/rentals");
const { Movie } = require("../Model/Movie");
const { Customer } = require("../Model/customer");

router.get("/", async (req, res) => {
  const result = await Rentals.find();
  res.send(result);
});

router.post("/", async (req, res) => {
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid Customer!!");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Movie not found");

  let rentals = new Rentals({
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      Phone: customer.Phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  const result = await rentals.save();
  res.send(result);
});

module.exports = router;
