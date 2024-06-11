const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  warrior: { type: String, required: true },
  imageUrl: { type: String, required: true },
  points: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Gallery", GallerySchema);


