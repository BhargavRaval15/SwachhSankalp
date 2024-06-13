const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", BlogSchema);

// routes/quotes.js
// const express = require("express");
// const router = express.Router();
// const Quote = require("../models/quote");

// router.get("/", async (req, res) => {
//   const quotes = await Quote.find({});
//   res.render("quotes/index", { quotes });
// });

// router.get("/:id", async (req, res) => {
//   const quote = await Quote.findById(req.params.id);
//   res.render("quotes/show", { quote });
// });

// module.exports = router;
