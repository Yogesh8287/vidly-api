const express = require("express");
const router = express.Router();
const User = require("../Model/user");

router.get("/", async (req, res) => {
  const result = await User.find().select("-Password");
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const result = await User.find({ _id: userId }).select("-Password");
  if (!result) return res.status(404).send("User Not found");
  res.send(result);
});

module.exports = router;
