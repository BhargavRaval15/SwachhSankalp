const express = require("express");
const router = express.Router();
const Gallery = require("../models/gallery");

router.get("/", async (req, res) => {
  const images = await Gallery.find({});
  res.render("gallery/index", { images });
});

router.get("/new", (req, res) => {
  res.render("gallery/new");
});

router.post("/", async (req, res) => {
  const { title, description, warrior, imageUrl } = req.body;
  const newImage = new Gallery({
    title,
    description,
    warrior,
    imageUrl,
  });
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

module.exports = router;
