const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookie = require("cookie-parser");
const session = require("express-session");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

// Load Models
require("./models/User");
require("./models/Story");

// Config Files
require("./config/passport")(passport);

// Load auth routes
const index = require("./routes/index");
const auth = require("./routes/auth");
const stories = require("./routes/stories");

// Keys
const keys = require("./config/keys");

// Handlebar Helpers
const {
  truncate,
  stripHTMLTags,
  formatDate,
  select,
  editIcon
} = require("./helpers/hbs");

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

// Parse application/x-www-form-urlencoded && Application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method Override Middleware
app.use(methodOverride("_method"));

// Handlebars middleware
app.engine(
  "handlebars",
  exphbs({
    helpers: {
      truncate: truncate,
      stripHTMLTags: stripHTMLTags,
      formatDate: formatDate,
      select: select,
      editIcon: editIcon
    },
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

//Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Use routes
app.use("/", index);
app.use("/auth", auth);
app.use("/stories", stories);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
