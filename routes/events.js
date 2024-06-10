const express = require("express");
const router = express.Router();
const Event = require("../models/event");

router.get("/", async (req, res) => {
  const events = await Event.find({});
  res.render("events/index", { events });
});

router.get("/new", (req, res) => {
  res.render("events/new");
});

router.post("/", async (req, res) => {
  const { title, description, date, location } = req.body;
  const newEvent = new Event({ title, description, date, location });
  await newEvent.save();
  req.flash("success_msg", "Event created successfully");
  res.redirect("/events");
});

router.get("/:id", async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.render("events/show", { event });
});

module.exports = router;