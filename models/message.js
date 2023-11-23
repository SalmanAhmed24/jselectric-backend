const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");
const userModel = require("./userModel");
const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    content: { type: String },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "chats" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("messages", messageSchema);
