const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const app = express();

mongoose.connect("mongodb://localhost:27017/swachh-sankalp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "swachh-sankalp-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.set("view engine", "ejs");

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/users");
const eventRoutes = require("./routes/events");
const blogRoutes = require("./routes/blogs");

app.use("/", indexRoutes);
app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/blogs", blogRoutes);

app.listen(3005, () => {
  console.log("SwachhSankalp server running on port 3005");
});
