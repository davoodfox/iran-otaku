const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  enTitle: {
    type: String,
    min: 3,
    max: 1024,
    required: true
  },
  faTitle: {
    type: String,
    min: 3,
    max: 1024,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Entry", userSchema);
