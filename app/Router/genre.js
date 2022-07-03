const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const { Genre } = require("../Model/genre");

router.get("/", async (req, res) => {
  throw new Error();
  const result = await Genre.find();
  res.send(result);
});

router.post("/", auth, async (req, res) => {
  const genre = new Genre({
    name: req.body.name,
  });
  const result = await genre.save();
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const genre = await Genre.findOne({ _id: req.params.id });
  if (!genre) {
    return res.status(400).send("invalid id");
  }
  genre.name = req.body.name;
  const result = await genre.save();
  res.send(result);
});

module.exports = router;
