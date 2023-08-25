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
    AISD,
    AISDExpDate,
    COAWaterDep,
    COAWaterDepExpDate,
    TFC,
    TFCExpDate,
    ABIA,
    ABIAExpDate,
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
  userToBeEdited.AISD = AISD;
  userToBeEdited.AISDExpDate = AISDExpDate;
  userToBeEdited.COAWaterDep = COAWaterDep;
  userToBeEdited.COAWaterDepExpDate = COAWaterDepExpDate;
  userToBeEdited.TFC = TFC;
  userToBeEdited.TFCExpDate = TFCExpDate;
  userToBeEdited.ABIA = ABIA;
  userToBeEdited.ABIAExpDate = ABIAExpDate;
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
exports.addUser = addUser;
exports.getUsers = getUsers;
exports.editUser = editUser;
exports.deleteUser = deleteUser;
exports.loginUser = loginUser;
