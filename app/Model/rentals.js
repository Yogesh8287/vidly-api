const mongoose = require("mongoose");

const Rentals = mongoose.model(
  "rentals",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          minlength: 5,
          maxlength: 50,
        },
        isGold: Boolean,
        Phone: {
          type: Number,
          min: 10,
        },
      }),
      required: true,
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,

          minlength: 5,
          maxlength: 100,
        },
        dailyRentalRate: {
          type: Number,
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },
  })
);

exports.Rentals = Rentals;
