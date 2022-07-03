const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 4,
    maxlength: 300,
  },
  Password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 300,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const { jwtprivatekey } = process.env;
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    jwtprivatekey
  );
  return token;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
