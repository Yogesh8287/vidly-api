const express = require("express");
const mongoose = require("mongoose");
require("express-async-errors");
require("dotenv").config();
const genre = require("./app/Router/genre");
const movie = require("./app/Router/movie");
const customer = require("./app/Router/customer");
const rentals = require("./app/Router/rentals");
const user = require("./app/Router/user");
const auth = require("./app/Router/logIn");
const error = require("./app/middleware/error");
const app = express();

mongoose
  .connect("mongodb://localhost/Vidly")
  .then(() => console.log("connected to Mongodb..."))
  .catch(() => {
    console.log("does not connect to Mongodb...");
    process.exit(1);
  });

app.use(express.json());
app.use("/genre", genre);
app.use("/api/rentals", rentals);
app.use("/api/users", user);
app.use("/", movie);
app.use("/customer", customer);
app.use("/auth", auth);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
