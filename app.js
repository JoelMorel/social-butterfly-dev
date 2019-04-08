const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

// Config Files
require("./config/passport")(passport);

// Load routes
const auth = require("./routes/auth");

// launch express app
const app = express();

app.get("/", (req, res) => {
  res.send("Sucess");
});

app.use("/auth", auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server starter on port: ${port}`);
});
