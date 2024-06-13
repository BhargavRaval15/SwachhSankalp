const express = require("express");
const router = express.Router();
const Quote = require("../models/quote");

router.get("/", async (req, res) => {
  const quotes = await Quote.find({});
  res.render("quote/index", { quotes });
});
router.get("/:id", async (req, res) => {
  const quote = await Quote.findById(req.params.id);
  res.render("quote/show", { quote });
});

module.exports = router;
