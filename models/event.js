const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  data: {
    type: Date,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Event", EventSchema);
