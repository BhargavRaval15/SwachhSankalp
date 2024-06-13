const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
});

module.exports = mongoose.model("Quote", QuoteSchema);
