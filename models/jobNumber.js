const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");
const jobNumberSchema = new mongoose.Schema({
  jobTag: { type: String },
  number: { type: String },
  jobPM: { type: String },
  jobName: { type: String },
  client: { type: String },
  dateCreated: { type: String },
  dateBilled: { type: String },
  jobCTM: { type: String },
  amount: { type: String },
  POContract: { type: String },
  changeOrder: { type: String },
  percentageBilled: { type: String },
  notes: { type: String },
});
module.exports = mongoose.model("jobNumbers", jobNumberSchema);
