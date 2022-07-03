const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const router = express.Router();
const User = require("../Model/user");

router.post("/signup", async (req, res) => {
  let validUser = await User.findOne({ email: req.body.email });
  if (validUser) return res.status(400).send("User already registered");

  let user = new User(_.pick(req.body, ["name", "email", "Password"]));
  const salt = await bcrypt.genSalt(10);
  user.Password = await bcrypt.hash(user.Password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Incorect Email or Password");

  const validPassword = await bcrypt.compare(req.body.Password, user.Password);
  if (!validPassword) return res.status(400).send("Incorect Email or Password");

  const token = user.generateAuthToken();

  res.send(token);
});

module.exports = router;
