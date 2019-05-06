const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookie = require("cookie-parser");
const session = require("express-session");
const exphbs = require("express-handlebars");

// Load User Model
require("./models/User");

// Config Files
require("./config/passport")(passport);

// Load auth routes
const index = require("./routes/index");
const auth = require("./routes/auth");

// Keys
const keys = require("./config/keys");

// Database Code
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Connected to database...");
  })
  .catch(err => console.log(err));

// Launch Express App
const app = express();

// Handlebars middleware
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Cookie parser and express session middle ware
app.use(cookie());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Global Variables
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Use routes
app.use("/", index);
app.use("/auth", auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
