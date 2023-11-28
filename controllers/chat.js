const chatModel = require("../models/chat");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");

// const addlaborLevel = async (req, res, next) => {
//   const { laborLevel } = req.body;
//   const createlaborLevelModel = new laborLevelModel({
//     laborLevel,
//   });
//   try {
//     await createlaborLevelModel.save();
//   } catch (error) {
//     res.json({ message: "Error adding Customer Type", error: true });
//     return next(error);
//   }
//   res.json({ message: "Created Successfully", error: false });
// };
// const getlaborLevel = async (req, res, next) => {
//   let laborLevels;
//   try {
//     laborLevels = await laborLevelModel.find({});
//   } catch (error) {
//     res.json({ message: "Error finding laborLevel list", error: true });
//     return next(error);
//   }
//   res.json({
//     laborLevels: laborLevels.map((item) => item.toObject({ getters: true })),
//     error: false,
//   });
// };
// const editlaborLevel = async (req, res, next) => {
//   const { laborLevel } = req.body;
//   const { laborLevelId } = req.params;
//   let typeToBeEdited;
//   try {
//     typeToBeEdited = await laborLevelModel.findById(laborLevelId);
//   } catch (error) {
//     res.json({ message: "Could not find the laborLevel", error: true });
//     return next(error);
//   }
//   typeToBeEdited.laborLevel = laborLevel;
//   try {
//     await typeToBeEdited.save();
//   } catch (error) {
//     res.json({ message: "Enable to edit laborLevel", error: true });
//     return next(error);
//   }
//   res.status(201).json({ message: "Edited successfully", error: false });
// };
// const deletelaborLevel = async (req, res, next) => {
//   const { laborLevelId } = req.params;
//   try {
//     await laborLevelModel.findByIdAndRemove(laborLevelId);
//   } catch (error) {
//     res.json({
//       message: "Could not found the specific laborLevel",
//       error: true,
//     });
//     return next(error);
//   }
//   res.status(201).json({ message: "Deleted successfully", error: false });
// };
const addChat = asyncHandler(async (req, res, next) => {
  const { userId, loggedInUserId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.json({
      message: "UserId param not send with request",
      error: true,
    });
  }

  var isChat = await chatModel
    .find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: loggedInUserId } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
    .populate(
      "users",
      "-password -attachments -schedules -notes -creditCard -companyPhone -personalPhone -username -tablet -vehicle -city -badges"
    )
    .populate("latestMessage");

  isChat = await userModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "fullname email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [loggedInUserId, userId],
    };

    try {
      const createdChat = await chatModel.create(chatData);
      const FullChat = await chatModel
        .findOne({ _id: createdChat._id })
        .populate(
          "users",
          "-password -attachments -schedules -notes -creditCard -companyPhone -personalPhone -username -tablet -vehicle -city -badges"
        );
      res.json({ allChat: FullChat, error: false });
    } catch (error) {
      res.json({ message: "Failed to add the chat", error: true });
    }
  }
});
const getChat = asyncHandler(async (req, res, next) => {
  const { loggedInUserId } = req.params;
  try {
    chatModel
      .find({ users: { $elemMatch: { $eq: loggedInUserId } } })
      .populate(
        "users",
        "-password -attachments -schedules -notes -creditCard -companyPhone -personalPhone -username -tablet -vehicle -city -badges"
      )
      .populate(
        "groupAdmin",
        "-password -attachments -schedules -notes -creditCard -companyPhone -personalPhone -username -tablet -vehicle -city -badges"
      )
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await userModel.populate(results, {
          path: "latestMessage.sender",
          select: "fullname email",
        });
        res.json({ allChats: results, error: false });
      });
  } catch (error) {
    res.status(400);
    res.json({ message: "Error Occured While adding chat", error: true });
    return next(error);
  }
});
const createGroupChat = asyncHandler(async (req, res, next) => {
  const { usersArr, loggedInUser, chatName } = req.body;
  var users = JSON.parse(usersArr);
  users.push(loggedInUser);
  console.log("these are users", users);
  try {
    const groupChat = await chatModel.create({
      chatName: chatName,
      users: users,
      isGroupChat: true,
      groupAdmin: loggedInUser,
    });

    const fullGroupChat = await chatModel
      .findOne({ _id: groupChat._id })
      .populate(
        "users",
        "-password -attachments -schedules -notes -creditCard -companyPhone -personalPhone -username -tablet -vehicle -city -badges"
      )
      .populate(
        "groupAdmin",
        "-password -attachments -schedules -notes -creditCard -companyPhone -personalPhone -username -tablet -vehicle -city -badges"
      );

    res.status(200).json({ allChats: fullGroupChat, error: false });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error in adding group chat", error: true });
    return next(error);
  }
});
const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await chatModel
    .findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
    .populate(
      "users",
      "-password -attachments -schedules -notes -creditCard -companyPhone -personalPhone -username -tablet -vehicle -city -badges"
    )
    .populate(
      "groupAdmin",
      "-password -attachments -schedules -notes -creditCard -companyPhone -personalPhone -username -tablet -vehicle -city -badges"
    );

  if (!removed) {
    res.status(404).json({ message: "Chat not found", error: true });
  } else {
    res.status(200).json(removed);
  }
});
const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await chatModel
    .findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
    .populate(
      "users",
      "-password -attachments -schedules -notes -creditCard -companyPhone -personalPhone -username -tablet -vehicle -city -badges"
    )
    .populate(
      "groupAdmin",
      "-password -attachments -schedules -notes -creditCard -companyPhone -personalPhone -username -tablet -vehicle -city -badges"
    );

  if (!added) {
    res.status(404).json({ message: "Chat not found", error: true });
  } else {
    res.status(200).json(added);
  }
});
exports.getChat = getChat;
exports.addChat = addChat;
exports.createGroupChat = createGroupChat;
exports.removeFromGroup = removeFromGroup;
exports.addToGroup = addToGroup;
