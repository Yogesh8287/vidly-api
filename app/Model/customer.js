const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  isGold: Boolean,
  Phone: {
    type: Number,
    required: true,
    min: 10,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

exports.Customer = Customer;
