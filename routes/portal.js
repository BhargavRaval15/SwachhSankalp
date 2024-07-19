const express = require("express");
const router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.redirect("/users/login");
  }
}

function noCache(req, res, next) {
  res.setHeader("Surrogate-Control", "no-store");
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
}
  
router.get("/", isAuthenticated, noCache, (req, res) => {
  res.render("portal");
});

module.exports = router;
