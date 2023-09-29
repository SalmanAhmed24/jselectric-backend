const userModel = require("../models/userModel");
const addUser = async (req, res, next) => {
  const {
    userType,
    position,
    vehicle,
    tablet,
    city,
    fullname,
    email,
    personalPhone,
    companyPhone,
    username,
    password,
  } = req.body;
  const createUserModel = new userModel({
    userType,
    position,
    vehicle,
    tablet,
    city,
    fullname,
    email,
    personalPhone,
    companyPhone,
    username,
    password,
    badges: [],
  });
  try {
    await createUserModel.save();
  } catch (error) {
    res.json({ message: "Error adding User", error: true });
    return next(error);
  }
  res.json({ message: "Created Successfully", error: false });
};
const getUsers = async (req, res, next) => {
  let allUsers;
  try {
    allUsers = await userModel.find({});
  } catch (error) {
    res.json({ message: "Error finding users list", error: true });
    return next(error);
  }
  res.json({
    allUsers: allUsers.map((item) => item.toObject({ getters: true })),
    error: false,
  });
};
const editUser = async (req, res, next) => {
  const {
    userType,
    position,
    vehicle,
    tablet,
    city,
    fullname,
    email,
    personalPhone,
    companyPhone,
    username,
    password,
  } = req.body;
  const { userId } = req.params;
  let userToBeEdited;
  try {
    userToBeEdited = await userModel.findById(userId);
  } catch (error) {
    res.json({ message: "Could not find the user", error: true });
    return next(error);
  }
  userToBeEdited.position = position;
  userToBeEdited.vehicle = vehicle;
  userToBeEdited.tablet = tablet;
  userToBeEdited.city = city;
  userToBeEdited.fullname = fullname;
  userToBeEdited.email = email;
  userToBeEdited.personalPhone = personalPhone;
  userToBeEdited.companyPhone = companyPhone;
  userToBeEdited.username = username;
  userToBeEdited.password = password;
  userToBeEdited.userType = userType;
  try {
    await userToBeEdited.save();
  } catch (error) {
    res.json({ message: "Enable to edit user", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Edited successfully", error: false });
};
const deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    await userModel.findByIdAndRemove(userId);
  } catch (error) {
    res.json({ message: "Could not found the specific user", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Deleted successfully", error: false });
};
const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  let userInfo;
  try {
    userInfo = await userModel.findOne({
      username: username,
      password: password,
    });
  } catch (error) {
    res.json({
      message: "Wrong Credentials check your username or password",
      error: true,
    });
  }
  if (userInfo == null) {
    res.json({
      message: "Wrong Credentials check your username or password",
      error: true,
    });
  } else {
    res.json({
      userInfo: {
        fullname: userInfo.fullname,
        id: userInfo.toObject({ getters: true }).id,
        userType: userInfo.userType,
        email: userInfo.email,
      },
      error: false,
    });
  }
};
const addBadges = async (req, res, next) => {
  const { userId } = req.params;
  const {
    AISD,
    AISDExpDate,
    COAWaterDep,
    COAWaterDepExpDate,
    TFC,
    TFCExpDate,
    ABIA,
    ABIAExpDate,
  } = req.body;
  let userToBeEdited;
  try {
    userToBeEdited = await userModel.findById(userId);
  } catch (error) {
    res.json({ message: "Could not find the unit", error: true });
    return next(error);
  }
  userToBeEdited.badges.AISD = AISD;
  userToBeEdited.badges.AISDExpDate = AISDExpDate;
  userToBeEdited.badges.COAWaterDep = COAWaterDep;
  userToBeEdited.badges.COAWaterDepExpDate = COAWaterDepExpDate;
  userToBeEdited.badges.TFC = TFC;
  userToBeEdited.badges.TFCExpDate = TFCExpDate;
  userToBeEdited.badges.ABIA = ABIA;
  userToBeEdited.badges.ABIAExpDate = ABIAExpDate;
  try {
    await userToBeEdited.save();
  } catch (error) {
    res.json({ message: "Enable to edit user", error: true });
    return next(error);
  }
  res.status(201).json({
    message: "Edited successfully",
    error: false,
    userInd: userToBeEdited,
  });
};
const editBadges = async (req, res, next) => {
  const { userId } = req.params;
  const {
    AISD,
    AISDExpDate,
    COAWaterDep,
    COAWaterDepExpDate,
    TFC,
    TFCExpDate,
    ABIA,
    ABIAExpDate,
  } = req.body;
  let userToBeEdited;
  try {
    userToBeEdited = await userModel.findById(userId);
  } catch (error) {
    res.json({ message: "Could not find the unit", error: true });
    return next(error);
  }
  userToBeEdited.badges.AISD = AISD;
  userToBeEdited.badges.AISDExpDate = AISDExpDate;
  userToBeEdited.badges.COAWaterDep = COAWaterDep;
  userToBeEdited.badges.COAWaterDepExpDate = COAWaterDepExpDate;
  userToBeEdited.badges.TFC = TFC;
  userToBeEdited.badges.TFCExpDate = TFCExpDate;
  userToBeEdited.badges.ABIA = ABIA;
  userToBeEdited.badges.ABIAExpDate = ABIAExpDate;
  try {
    await userToBeEdited.save();
  } catch (error) {
    res.json({ message: "Enable to edit user", error: true });
    return next(error);
  }
  res.status(201).json({
    message: "Edited successfully",
    error: false,
    userInd: userToBeEdited,
  });
};
const addNotes = async (req, res, next) => {
  const { date, time, note, user } = req.body;
  const { userId } = req.params;
  try {
    await userModel.updateOne(
      { _id: userId },
      {
        $push: {
          notes: { note: note, date: date, time: time, user: user },
        },
      }
    );
  } catch (error) {
    res.json({ message: "Could not find the user", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Edited successfully", error: false });
};
const editNotes = async (req, res, next) => {
  const { userId } = req.params;
  const { note, date, time, user, id } = req.body;
  let userToBeEdited;
  try {
    userToBeEdited = await userModel.findById(userId);
  } catch (error) {
    res.json({ message: "Could not find the user", error: true });
    return next(error);
  }
  userToBeEdited.notes.forEach((i) => {
    if (i._id == id) {
      i.note = note;
      i.date = date;
      i.time = time;
      i.user = user;
    }
  });
  try {
    await userToBeEdited.save();
  } catch (error) {
    res.json({ message: "Enable to edit notes", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Edited successfully", error: false });
};
const delNotes = async (req, res, next) => {
  const { userId, noteId } = req.params;
  console.log("this is ind id", noteId);
  try {
    await userModel.updateOne(
      { _id: userId },
      {
        $pull: {
          notes: { _id: noteId },
        },
      }
    );
  } catch (error) {
    res.json({ message: "Could not find the user note", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Edited successfully", error: false });
};
exports.addUser = addUser;
exports.getUsers = getUsers;
exports.editUser = editUser;
exports.deleteUser = deleteUser;
exports.loginUser = loginUser;
exports.addBadges = addBadges;
exports.editBadges = editBadges;
exports.addNotes = addNotes;
exports.editNotes = editNotes;
exports.delNotes = delNotes;
