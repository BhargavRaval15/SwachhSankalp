// routes/about.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("quote");
});

module.exports = router;
