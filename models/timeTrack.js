const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");
const timeTrackSchema = new mongoose.Schema({
  employee: { type: String },
  job: { type: String },
  phase: { type: String },
  date: { type: String },
  startTime: { type: String },
  endTime: { type: String },
  spectrum: { type: Boolean },
  lunch: { type: Boolean },
  breakStartTime: { type: String },
  breakEndTime: { type: String },
  user: { type: String },
});
module.exports = mongoose.model("timeTracks", timeTrackSchema);
