const toolsModel = require("../models/tools");
const addTools = async (req, res, next) => {
  const {
    category,
    description,
    techAssigned,
    location,
    subCategory,
    employee,
    project,
    lastPurchasePrice,
    picture,
    serial,
    toolNumber,
  } = req.body;
  const createToolsModel = new toolsModel({
    category,
    description,
    techAssigned,
    location,
    subCategory,
    employee,
    project,
    lastPurchasePrice,
    picture,
    serial,
    toolNumber,
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
  const {
    category,
    description,
    techAssigned,
    location,
    subCategory,
    employee,
    project,
    lastPurchasePrice,
    picture,
    serial,
    toolNumber,
  } = req.body;
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
  toolsToBeEdited.subCategory = subCategory;
  toolsToBeEdited.employee = employee;
  toolsToBeEdited.project = project;
  toolsToBeEdited.lastPurchasePrice = lastPurchasePrice;
  toolsToBeEdited.picture = picture;
  toolsToBeEdited.serial = serial;
  toolsToBeEdited.toolNumber = toolNumber;
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
const addPartsItem = async (req, res, next) => {
  const { partNo, description } = req.body;
  const { toolId } = req.params;

  try {
    await toolsModel.updateOne(
      { _id: toolId },
      {
        $push: {
          parts: {
            partNo,
            description,
          },
        },
      }
    );
  } catch (error) {
    res.json({ message: "Could not find the tool", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Edited successfully", error: false });
};
const editPartsItem = async (req, res, next) => {
  const { partNo, description } = req.body;
  const { toolId, partId } = req.params;
  try {
    userToBeEdited = await toolsModel.findById(toolId);
  } catch (error) {
    res.json({ message: "Could not find the tool", error: true });
    return next(error);
  }
  userToBeEdited.parts.forEach((i) => {
    if (i.id == partId) {
      i.partNo = partNo;
      i.description = description;
    }
  });
  try {
    await userToBeEdited.save();
  } catch (error) {
    res.json({ message: "Enable to edit parts/Items", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Edited successfully", error: false });
};
const delPartsItem = async (req, res, next) => {
  const { toolId, partId } = req.params;
  try {
    await toolsModel.updateOne(
      { _id: toolId },
      {
        $pull: {
          parts: { _id: partId },
        },
      }
    );
  } catch (error) {
    res.json({ message: "Could not find the tool", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Deleted successfully", error: false });
};
// const addInfo = async (req, res, next) => {
//   const { toolId } = req.params;
//   const { subCategory, employee, project, lastPurchasePrice, picture } =
//     req.body;
//   npm;
//   let toolsToBeEdited;
//   try {
//     toolsToBeEdited = await toolsModel.findById(toolId);
//   } catch (error) {
//     res.json({ message: "Could not find the tool", error: true });
//     return next(error);
//   }
//   toolsToBeEdited.info.subCategory = subCategory;
//   toolsToBeEdited.info.employee = employee;
//   toolsToBeEdited.info.project = project;
//   toolsToBeEdited.info.lastPurchasePrice = lastPurchasePrice;
//   toolsToBeEdited.info.picture = picture;
//   try {
//     await toolsToBeEdited.save();
//   } catch (error) {
//     res.json({ message: "Enable to edit tools", error: true });
//     return next(error);
//   }
//   res.status(201).json({ message: "Edited successfully", error: false });
// };
// const editInfo = async (req, res, next) => {
//   const { toolId } = req.params;
//   const { subCategory, employee, project, lastPurchasePrice, picture } =
//     req.body;
//   let toolsToBeEdited;
//   try {
//     toolsToBeEdited = await toolsModel.findById(toolId);
//   } catch (error) {
//     res.json({ message: "Could not find the tool", error: true });
//     return next(error);
//   }
//   toolsToBeEdited.info.subCategory = subCategory;
//   toolsToBeEdited.info.employee = employee;
//   toolsToBeEdited.info.project = project;
//   toolsToBeEdited.info.lastPurchasePrice = lastPurchasePrice;
//   toolsToBeEdited.info.picture = picture;
//   try {
//     await toolsToBeEdited.save();
//   } catch (error) {
//     res.json({ message: "Enable to edit tools", error: true });
//     return next(error);
//   }
//   res.status(201).json({ message: "Edited successfully", error: false });
// };
exports.addTools = addTools;
exports.editTools = editTools;
exports.delTools = delTools;
exports.getTools = getTools;
// exports.addInfo = addInfo;
// exports.editInfo = editInfo;
exports.addPartsItem = addPartsItem;
exports.editPartsItem = editPartsItem;
exports.delPartsItem = delPartsItem;
