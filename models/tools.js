const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");
const toolsSchema = new mongoose.Schema({
  category: { type: String },
  description: { type: String },
  techAssigned: { type: String },
  location: { type: String },
  subCategory: { type: String },
  employee: { type: String },
  project: { type: String },
  lastPurchasePrice: { type: String },
  picture: {
    fileUrl: { type: String },
    filename: { type: String },
  },
  serial: { type: String },
  toolNumber: { type: String },
  parts: [
    {
      partNo: { type: String },
      description: { type: String },
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
  history: [{ type: Object }],
});
module.exports = mongoose.model("tools", toolsSchema);
