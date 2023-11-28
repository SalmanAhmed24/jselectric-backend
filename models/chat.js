const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");
const userModel = require("./userModel");
const chatSchema = new mongoose.Schema(
  {
    chatName: { type: String },
    isGroupChat: { type: Boolean },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "messages" },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    moduleAttachments: [{ type: Object }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("chats", chatSchema);
