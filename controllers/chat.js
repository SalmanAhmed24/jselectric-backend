const chatModel = require("../models/chat");
const userModel = require("../models/userModel");
const messageModel = require("../models/message");
const addChat = async (req, res, next) => {
  const { currentUserId, members, isGroup, name } = req.body;
  var query = isGroup
    ? { isGroup, name, members: [currentUserId, ...members] }
    : { members: { $all: [currentUserId, ...members], $size: 2 } };
  try {
    let chat = await chatModel.findOne(query);
    if (!chat) {
      chat = new chatModel(
        isGroup ? query : { members: [currentUserId, ...members] }
      );
      await chat.save();
      const updateAllMembers = chat.members.map(async (memberId) => {
        await userModel.findByIdAndUpdate(
          memberId,
          {
            $addToSet: { chats: chat._id },
          },
          { new: true }
        );
      });
      Promise.all(updateAllMembers);
    }
    res.json({ message: "Created Successfully", chat: chat, error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding Chat", error: true });
  }
};
const getChat = async (req, res, next) => {
  const { userId } = req.params;
  const { chatId } = req.query;
  if (chatId !== null && chatId !== undefined && chatId !== "") {
    try {
      const chat = await chatModel
        .findById(chatId)
        .populate({
          path: "members",
          model: userModel,
        })
        .populate({
          path: "messages",
          model: messageModel,
          populate: { path: "sender seenBy", model: userModel },
        })
        .exec();
      res.json({
        chat: chat,
        error: false,
      });
    } catch (error) {
      res.json({ message: "Error finding chat", error: true });
    }
  } else {
    try {
      const allChats = await chatModel
        .find({ members: userId })
        .sort({ lastMessage: -1 })
        .populate({
          path: "members",
          model: userModel,
        })
        .populate({
          path: "messages",
          model: messageModel,
          populate: {
            path: "sender seenBy",
            model: userModel,
          },
        })
        .exec();
      res.json({
        chat: allChats.map((item) => item.toObject({ getters: true })),
        error: false,
      });
    } catch (error) {
      res.json({ message: "Error finding chat", error: true });
    }
  }
};
const seenBy = async (req, res, next) => {
  const { chatId } = req.params;
  const { currentUserId } = req.body;
  console.log("this is chatId", chatId);
  console.log("this is currentUser", currentUserId);
  try {
    await messageModel
      .updateMany(
        { chat: chatId },
        { $addToSet: { seenBy: currentUserId } },
        { new: true }
      )
      .populate({
        path: "sender seenBy",
        model: userModel,
      })
      .exec();
    res.json({ message: "seen all messages by user", error: false });
  } catch (error) {
    res.status(500).json({ message: "error occured", error: true });
  }
};
exports.addChat = addChat;
exports.seenBy = seenBy;
exports.getChat = getChat;
