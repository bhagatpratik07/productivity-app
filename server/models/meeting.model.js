const mongoose = require("mongoose");

const meetingSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Meeting", meetingSchema);
