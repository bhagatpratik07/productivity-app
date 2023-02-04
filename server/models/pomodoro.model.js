const mongoose = require("mongoose");

const PomodoroSchema = mongoose.Schema({
  duration: {
    type: Number,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Pomodoro", PomodoroSchema);
