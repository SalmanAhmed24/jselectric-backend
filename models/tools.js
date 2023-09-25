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
  picture: { type: String },
  serial: { type: String },
  toolNumber: { type: String },
  parts: [
    {
      partName: { type: String },
      quantity: { type: Number },
      description: { type: String },
    },
  ],
  files: [{ type: Object }],
  history: [{ type: Object }],
});
module.exports = mongoose.model("tools", toolsSchema);
