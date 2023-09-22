const toolsModel = require("../models/tools");
const addTools = async (req, res, next) => {
  const { category, description, techAssigned, location } = req.body;
  const createToolsModel = new toolsModel({
    category,
    description,
    techAssigned,
    location,
    info: null,
    parts: [],
    files: [],
    history: [],
  });
  try {
    await createToolsModel.save();
  } catch (error) {
    res.json({ message: "Error adding Tools", error: true });
    return next(error);
  }
  res.json({ message: "Created Successfully", error: false });
};
const editTools = async (req, res, next) => {
  const { category, description, techAssigned, location } = req.body;
  const { toolId } = req.params;
  let toolsToBeEdited;
  try {
    toolsToBeEdited = await toolsModel.findById(toolId);
  } catch (error) {
    res.json({ message: "Could not find the tools", error: true });
    return next(error);
  }
  toolsToBeEdited.category = category;
  toolsToBeEdited.description = description;
  toolsToBeEdited.techAssigned = techAssigned;
  toolsToBeEdited.location = location;
  try {
    await toolsToBeEdited.save();
  } catch (error) {
    res.json({ message: "Enable to edit tools", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Edited successfully", error: false });
};
const getTools = async (req, res, next) => {
  let alltools;
  try {
    alltools = await toolsModel.find({});
  } catch (error) {
    res.json({ message: "Error finding tools list", error: true });
    return next(error);
  }
  res.json({
    allTools: alltools.map((item) => item.toObject({ getters: true })),
    error: false,
  });
};
const delTools = async (req, res, next) => {
  const { toolId } = req.params;
  try {
    await toolsModel.findByIdAndRemove(toolId);
  } catch (error) {
    res.json({ message: "Could not found the specific tool", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Deleted successfully", error: false });
};
const addInfo = async (req, res, next) => {
  const { toolId } = req.params;
  const { subCategory, Employee, Project, lastPurchasePrice } = req.body;
  const { image } = req.files;
  console.log("this is file", image);
  // let userToBeEdited;
  // try {
  //   userToBeEdited = await userModel.findById(userId);
  // } catch (error) {
  //   res.json({ message: "Could not find the unit", error: true });
  //   return next(error);
  // }
  // userToBeEdited.badges.AISD = AISD;
  // userToBeEdited.badges.AISDExpDate = AISDExpDate;
  // userToBeEdited.badges.COAWaterDep = COAWaterDep;
  // userToBeEdited.badges.COAWaterDepExpDate = COAWaterDepExpDate;
  // userToBeEdited.badges.TFC = TFC;
  // userToBeEdited.badges.TFCExpDate = TFCExpDate;
  // userToBeEdited.badges.ABIA = ABIA;
  // userToBeEdited.badges.ABIAExpDate = ABIAExpDate;
  // try {
  //   await userToBeEdited.save();
  // } catch (error) {
  //   res.json({ message: "Enable to edit user", error: true });
  //   return next(error);
  // }
  // res.status(201).json({ message: "Edited successfully", error: false });
};
const editInfo = async (req, res, next) => {};
const delInfo = async (req, res, next) => {};
exports.addTools = addTools;
exports.editTools = editTools;
exports.delTools = delTools;
exports.getTools = getTools;
exports.addInfo = addInfo;
exports.editInfo = editInfo;
exports.delInfo = delInfo;
