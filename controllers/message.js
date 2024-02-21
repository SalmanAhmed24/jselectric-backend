const chatModel = require("../models/chat");
const userModel = require("../models/userModel");
const messageModel = require("../models/message");
const chat = require("../models/chat");
const Pusher = require("pusher");
const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECERET,
  cluster: "ap2",
  useTLS: true,
});
const addMessage = async (req, res, next) => {
  const { currentUserId, chatId, text } = req.body;

  try {
    const currentUser = await userModel.findById(currentUserId);
    const newMessage = await messageModel.create({
      chat: chatId,
      sender: currentUser,
      text: text,
      seenBy: currentUserId,
    });
    const updatedChat = await chatModel
      .findByIdAndUpdate(
        chatId,
        {
          $push: { messages: newMessage._id },
          $set: { lastMessage: newMessage.createdAt },
        },
        { new: true }
      )
      .populate({
        path: "messages",
        model: messageModel,
        populate: { path: "sender seenBy", model: userModel },
      })
      .populate({
        path: "members",
        model: userModel,
      })
      .exec();
    await pusherServer.trigger(chatId, "new-message", newMessage);
    const lastMessage = updatedChat.messages[updatedChat.messages.length - 1];
    updatedChat.members.forEach(async (member) => {
      try {
        await pusherServer.trigger(member._id.toString(), "update-chat", {
          id: chatId,
          messages: [lastMessage],
        });
      } catch (error) {
        console.log(error);
      }
    });
    res.status(200).json({ newMessage: newMessage, error: false });
  } catch (error) {
    // res.json({ message: "Created Successfully", chat: chat, error: false });
    console.log(error);
    res.status(500).json({ message: "Error sending message", error: true });
  }
};
// const getMessage = async (req, res, next) => {
//   try {
//     res.json({
//       chat: chat,
//       error: false,
//     });
//   } catch (error) {
//     res.json({ message: "Error finding chat", error: true });
//   }
// }

exports.addMessage = addMessage;
// exports.getChat = getChat;
