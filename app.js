const express = require("express");
const mongoose = require("mongoose");

// launch express app
const app = express();

app.get("/", (req, res) => {
  res.send("Sucess");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server starter on port: ${port}`);
});
