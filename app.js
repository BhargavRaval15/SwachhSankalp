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

// app.get("/", (req, res) => {
//   GallerySchema.find({}).then((data, err) => {
//     if (err) {
//       console.log(err);
//     }
//     res.render("gallery", { items: data });
//   });
// });

// app.post("/", upload.single("image"), (req, res, next) => {
//   var obj = {
//     name: req.body.name,
//     desc: req.body.desc,
//     img: {
//       data: fs.readFileSync(
//         path.join(__dirname + "/uploads/" + req.file.filename)
//       ),
//       contentType: "image/png",
//     },
//   };
//   imgSchema.create(obj).then((err, item) => {
//     if (err) {
//       console.log(err);
//     } else {
//       // item.save();
//       res.redirect("/");
//     }
//   });
// });
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
const galleryRoutes = require("./routes/gallery");

app.use("/", indexRoutes);
app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/blogs", blogRoutes);
app.use("/gallery", galleryRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(3005, () => {
  console.log("SwachhSankalp server running on port 3005");
});
