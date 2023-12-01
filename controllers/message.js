const messageModel = require("../models/message");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const chatModel = require("../models/chat");
const Pusher = require("pusher");
const pusher = new Pusher({
  appId: "1715435",
  key: "07be80edc6aa2291c746",
  secret: "932c773fe688e5a879d7",
  cluster: "ap2",
  useTLS: true,
});
const addMessage = asyncHandler(async (req, res, next) => {
  const { content, chatId, sender, moduleAttachments } = req.body;
  var newMessage = {
    sender: sender,
    content: content,
    chat: chatId,
  };
  try {
    var message = await messageModel.create(newMessage);
    message = await message.populate("sender", "fullname email");
    message = await message.populate("chat");
    message = await userModel.populate(message, {
      path: "chat.users",
      select: "fullname email",
    });
    await chatModel.findByIdAndUpdate(chatId, {
      latestMessage: message,
      $push: {
        moduleAttachments: moduleAttachments,
      },
    });
    pusher.trigger("chat-live", "add-message", {
      message: message,
    });
    res.json({ messages: message, error: false });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error occured while adding", error: true });
    return next(error);
  }
});
const getMessage = asyncHandler(async (req, res, next) => {
  const { chatId } = req.params;
  try {
    let messages = await messageModel
      .find({ chat: chatId })
      .populate("sender", "fullname email")
      .populate("chat");
    res.json({ messages: messages, error: false });
  } catch (error) {
    res.status(400).json({ message: "Unable to add message", error: true });
    return next(error);
  }
});
exports.getMessage = getMessage;
exports.addMessage = addMessage;
