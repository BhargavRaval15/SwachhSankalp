const express = require("express");
const router = express.Router();
const Gallery = require("../models/gallery");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  const images = await Gallery.find({});
  res.render("gallery/index", { images });
});

router.get("/new", (req, res) => {
  res.render("gallery/new");
});

router.post("/", upload.single("image"), async (req, res) => {
  const { title, description, warrior } = req.body;
  const imageUrl = req.file ? req.file.path : "";

  const newImage = new Gallery({ title, description, warrior, imageUrl });
  await newImage.save();
  req.flash("success_msg", "Image uploaded successfully");
  res.redirect("/gallery");
});

router.get("/:id", async (req, res) => {
  const image = await Gallery.findById(req.params.id);
  res.render("gallery/show", { image });
});

router.post("/:id/points", async (req, res) => {
  const { points } = req.body;
  const image = await Gallery.findById(req.params.id);
  image.points = points;
  await image.save();
  req.flash("success_msg", "Points updated successfully");
  res.redirect(`/gallery/${req.params.id}`);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the image by ID and delete it
    const deletedImage = await Gallery.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).send("Image not found");
    }

    // Optionally, you might want to update user points or perform other actions

    // Redirect or respond with a success message
    res.redirect("/gallery"); // Redirect to gallery page after deletion
  } catch (err) {
    console.error("Error deleting image:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
