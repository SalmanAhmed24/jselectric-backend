const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");
const userSchema = new mongoose.Schema({
  userType: { type: String, required: true },
  position: { type: String },
  vehicle: { type: String },
  tablet: { type: String },
  city: { type: String },
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  personalPhone: { type: String },
  companyPhone: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  AISD: { type: Boolean },
  AISDExpDate: { type: String },
  COAWaterDep: { type: Boolean },
  COAWaterDepExpDate: { type: String },
  TFC: { type: Boolean },
  TFCExpDate: { type: String },
  ABIA: { type: Boolean },
  ABIAExpDate: { type: String },
});
userSchema.plugin(validator);
module.exports = mongoose.model("users", userSchema);
