const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");
const userSchema = new mongoose.Schema({
  userType: { type: String, required: true },
  position: { type: String },
  vehicle: { type: String },
  tablet: { type: String },
  city: { type: String },
  primaryAddress: { type: String },
  secondaryAddress: { type: String },
  state: { type: String },
  zipcode: { type: String },
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  personalPhone: { type: String },
  companyPhone: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  creditCard: { type: String },
  badges: {
    AISD: { type: String },
    AISDExpDate: { type: String },
    COAWaterDep: { type: String },
    COAWaterDepExpDate: { type: String },
    TFC: { type: String },
    TFCExpDate: { type: String },
    ABIA: { type: String },
    ABIAExpDate: { type: String },
  },
  notes: [
    {
      date: { type: String },
      time: { type: String },
      user: { type: String },
      note: { type: String },
    },
  ],
  attachments: [
    {
      files: [
        {
          fileUrl: { type: String },
          filename: { type: String },
        },
      ],
      user: { type: String },
      date: { type: String },
      time: { type: String },
      note: { type: String },
    },
  ],
  schedules: [
    {
      date: { type: String },
      startTime: { type: String },
      endTime: { type: String },
      title: { type: String },
    },
  ],
  chats: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "chats" }],
    default: [],
  },
  taskNotification: { type: Boolean },
});
userSchema.plugin(validator);
module.exports = mongoose.model("users", userSchema);
