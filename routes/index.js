const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});
// Add this route for the oath page
router.get("/sankalp", (req, res) => {
  res.render("sankalp");
});
module.exports = router;
