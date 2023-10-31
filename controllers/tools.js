const aws = require("aws-sdk");
const dotenv = require("dotenv");
const momentObj = require("moment");
dotenv.config();
const s3 = new aws.S3({
  accessKeyId: `${process.env.ACCESS_KEY_AWS}`,
  secretAccessKey: `${process.env.SECRET_KEY_AWS}`,
  region: `${process.env.AWS_BUCKET_REGION}`,
  Bucket: `${process.env.AWS_BUCKET_NAME}`,
});
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
    serial,
    toolNumber,
  } = req.body;
  var arr = [];
  try {
    await uploadToS3(req.files[0])
      .then((res) => {
        arrReturn(res, arr);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.json({ message: "Error Occured in S3 upload", error: true });
  }
  const createToolsModel = new toolsModel({
    category,
    description,
    techAssigned,
    location,
    subCategory,
    employee,
    project,
    lastPurchasePrice,
    picture: { fileUrl: arr[0].fileUrl, filename: arr[0].filename },
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
  if (req.body.newFileFlag == false) {
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
  } else {
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
    var arr = [];
    try {
      await uploadToS3(req.files[0])
        .then((res) => {
          arrReturn(res, arr);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      res.json({ message: "Error Occured in S3 upload", error: true });
    }

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
    toolsToBeEdited.picture = arr[0];
    toolsToBeEdited.serial = serial;
    toolsToBeEdited.toolNumber = toolNumber;
    try {
      await toolsToBeEdited.save();
    } catch (error) {
      res.json({ message: "Enable to edit tools", error: true });
      return next(error);
    }
    res.status(201).json({ message: "Edited successfully", error: false });
  }
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

const addFiles = async (req, res, next) => {
  const { date, time, user, note } = req.body;
  const { toolId } = req.params;
  const files = req.files;
  var arr = [];
  try {
    let i = 0;
    let userToBeEdited;
    while (i < files.length) {
      await uploadToS3(files[i])
        .then((res) => {
          arrReturn(res, arr);
        })
        .catch((err) => console.log(err));
      i++;
    }
    await toolsModel.updateOne(
      { _id: toolId },
      {
        $push: {
          attachments: {
            note: note,
            date: date,
            time: time,
            user: user,
            files: arr,
          },
        },
      }
    );
  } catch (error) {
    res.json({ message: "Could not find the user note", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Edited successfully", error: false });
};
const arrReturn = (item, arr) => {
  arr.push(item);
};
const editFiles = async (req, res, next) => {
  const { toolId } = req.params;
  const { note, date, time, user, id, newFileFlag, editFlag, oldFiles } =
    req.body;
  const files = req.files;
  let userToBeEdited;
  if (newFileFlag === "true") {
    console.log("here in true");
    var arr = [];
    const prevFileArr = JSON.parse(oldFiles);
    try {
      prevFileArr.forEach((item) => {
        deleteAwsObj(item);
      });
    } catch (error) {
      console.log(error);
    }
    try {
      let i = 0;
      while (i < files.length) {
        await uploadToS3(files[i])
          .then((res) => {
            arrReturn(res, arr);
          })
          .catch((err) => console.log(err));
        i++;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      userToBeEdited = await toolsModel.findById(toolId);
    } catch (error) {
      res.json({ message: "Could not find the attachments", error: true });
      return next(error);
    }
    console.log("*****", arr);
    userToBeEdited.attachments.forEach((i) => {
      if (i._id.toString() == id) {
        i.note = note;
        i.date = date;
        i.time = time;
        i.user = user;
        i.files = arr;
      }
    });
    try {
      await userToBeEdited.save();
    } catch (error) {
      res.json({ message: "Enable to edit notes", error: true });
      return next(error);
    }
    res.status(201).json({ message: "Edited successfully", error: false });
  } else {
    const prevFileArr = JSON.parse(oldFiles);
    console.log("@@@$$$ here", prevFileArr, newFileFlag);
    try {
      userToBeEdited = await toolsModel.findById(toolId);
    } catch (error) {
      res.json({ message: "Could not find the attachments", error: true });
      return next(error);
    }
    userToBeEdited.attachments.forEach((i) => {
      if (i._id.toString() == id) {
        i.note = note;
        i.date = date;
        i.time = time;
        i.user = user;
        i.files = prevFileArr;
      }
    });
    try {
      await userToBeEdited.save();
    } catch (error) {
      res.json({ message: "Enable to edit notes", error: true });
      return next(error);
    }
    res.status(201).json({ message: "Edited successfully", error: false });
  }
};
const deleteAwsObj = async (obj) => {
  console.log("here in deleAWs", obj);

  return new Promise((resolve, reject) => {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: obj.filename,
    };
    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.log("@@@@@!!!!!", err), reject(err);
      }
      return resolve(data);
    });
  });
};
const delFiles = async (req, res, next) => {
  const { toolId, attachmentId } = req.params;
  const { oldFiles } = req.body;
  try {
    oldFiles.forEach((item) => {
      deleteAwsObj(item);
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Could not find the user note", error: true });
    return next(error);
  }
  try {
    await toolsModel.updateOne(
      { _id: toolId },
      {
        $pull: {
          attachments: { _id: attachmentId },
        },
      }
    );
  } catch (error) {
    res.json({ message: "Could not find the user note", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Deleted successfully", error: false });
};

const uploadToS3 = (file) => {
  console.log("here in uploadS3", file);

  return new Promise((resolve, reject) => {
    const params = {
      Bucket: `js-electric-app`,
      Key: `${momentObj().format("hh:mm:ss")}-${file.originalname}`,
      Body: file.buffer,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.log("@@!!!!!!@#!#!@#!@#@#@!#!@# file", err), reject(err);
      }
      const dataObj = {
        fileUrl: data.Location,
        filename: data.Key,
      };
      return resolve(dataObj);
    });
  });
};

exports.addTools = addTools;
exports.editTools = editTools;
exports.delTools = delTools;
exports.getTools = getTools;
// exports.addInfo = addInfo;
// exports.editInfo = editInfo;
exports.addPartsItem = addPartsItem;
exports.editPartsItem = editPartsItem;
exports.delPartsItem = delPartsItem;
exports.addFiles = addFiles;
exports.editFiles = editFiles;
exports.delFiles = delFiles;
