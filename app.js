const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const passport = require("./config/passport-config");
const multer = require("multer");
const path = require("path");
const app = express();

mongoose.connect("mongodb://localhost:27017/swachh-sankalp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

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
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/users");
const eventRoutes = require("./routes/events");
const blogRoutes = require("./routes/blogs");
const galleryRoutes = require("./routes/gallery");
const aboutRoutes = require("./routes/about");
const quoteRoutes = require("./routes/quote");
const contactRoutes = require("./routes/contact");
const portalRoutes = require("./routes/portal");

app.use("/", indexRoutes);
app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/blogs", blogRoutes);
app.use("/gallery", galleryRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/about", aboutRoutes);
app.use("/quote", quoteRoutes);
app.use("/contact", contactRoutes);
app.use("/portal", portalRoutes);

app.listen(3005, () => {
  console.log("SwachhSankalp server running on port 3005");
});
