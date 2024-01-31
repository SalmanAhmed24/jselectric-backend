const taskModel = require("../models/taskModel");
const fs = require("fs");
const { uploadFile, getFile } = require("../s3");
const aws = require("aws-sdk");
const dotenv = require("dotenv");
const momentObj = require("moment");
// const { options } = require("../routes/users");
dotenv.config();
const s3 = new aws.S3({
  accessKeyId: `${process.env.ACCESS_KEY_AWS}`,
  secretAccessKey: `${process.env.SECRET_KEY_AWS}`,
  region: `${process.env.AWS_BUCKET_REGION}`,
  Bucket: `${process.env.AWS_BUCKET_NAME}`,
});
const addTask = async (req, res, next) => {
  const {
    currentDate,
    user,
    taskCategory,
    dueDate,
    description,
    taskStatus,
    assignedTo,
    selectedModule,
    moduleArr,
  } = req.body;
  const createTaskModel = new taskModel({
    currentDate,
    user,
    taskCategory,
    dueDate,
    description,
    taskStatus,
    assignedTo,
    attachments: [],
    subTasks: [],
    notes: [],
    selectedModule,
    moduleArr,
  });
  try {
    await createTaskModel.save();
  } catch (error) {
    res.json({ message: "Error adding Task", error: true });
    return next(error);
  }
  res.json({ message: "Created Successfully", error: false });
};
const getTask = async (req, res, next) => {
  let allTasks;
  try {
    allTasks = await taskModel.find({});
  } catch (error) {
    res.json({ message: "Error finding Tasks list", error: true });
    return next(error);
  }
  res.json({
    allTasks: allTasks.map((item) => item.toObject({ getters: true })),
    error: false,
  });
};
const editTask = async (req, res, next) => {
  const {
    currentDate,
    user,
    taskCategory,
    dueDate,
    description,
    taskStatus,
    assignedTo,
    selectedModule,
    moduleArr,
    attachments,
    subTasks,
    notes,
  } = req.body;
  const { taskId } = req.params;
  let taskToBeEdited;
  try {
    taskToBeEdited = await taskModel.findById(taskId);
  } catch (error) {
    res.json({ message: "Could not find the task", error: true });
    return next(error);
  }
  taskToBeEdited.currentDate = currentDate;
  taskToBeEdited.user = user;
  taskToBeEdited.taskCategory = taskCategory;
  taskToBeEdited.dueDate = dueDate;
  taskToBeEdited.description = description;
  taskToBeEdited.taskStatus = taskStatus;
  taskToBeEdited.assignedTo = assignedTo;
  taskToBeEdited.selectedModule = selectedModule;
  taskToBeEdited.moduleArr = moduleArr;
  taskToBeEdited.attachments = attachments;
  taskToBeEdited.subTasks = subTasks;
  taskToBeEdited.notes = notes;
  try {
    await taskToBeEdited.save();
  } catch (error) {
    res.json({ message: "Enable to edit task", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Edited successfully", error: false });
};
const deleteTask = async (req, res, next) => {
  const { taskId } = req.params;
  try {
    await taskModel.findByIdAndRemove(taskId);
  } catch (error) {
    res.json({ message: "Could not found the specific task", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Deleted successfully", error: false });
};
const addSubTask = async (req, res, next) => {
  const {
    currentDate,
    user,
    taskCategory,
    dueDate,
    description,
    taskStatus,
    assignedTo,
  } = req.body;
  const { taskId } = req.params;

  try {
    await taskModel.updateOne(
      { _id: taskId },
      {
        $push: {
          subTasks: {
            currentDate,
            user,
            taskCategory,
            dueDate,
            description,
            taskStatus,
            assignedTo,
          },
        },
      }
    );
  } catch (error) {
    res.json({ message: "Could not add the sub task", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Added successfully", error: false });
};
const editSubTask = async (req, res, next) => {
  const {
    currentDate,
    user,
    taskCategory,
    dueDate,
    description,
    taskStatus,
    assignedTo,
  } = req.body;
  const { taskId, subTaskId } = req.params;
  try {
    taskToBeEdited = await taskModel.findById(taskId);
  } catch (error) {
    res.json({ message: "Could not find the task", error: true });
    return next(error);
  }
  taskToBeEdited.subTasks.forEach((i) => {
    if (i.id == subTaskId) {
      i.currentDate = currentDate;
      i.user = user;
      i.taskCategory = taskCategory;
      i.dueDate = dueDate;
      i.taskStatus = taskStatus;
      i.description = description;
      i.assignedTo = assignedTo;
    }
  });
  try {
    await taskToBeEdited.save();
  } catch (error) {
    res.json({ message: "Enable to edit Sub Task", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Edited successfully", error: false });
};
const delSubTasks = async (req, res, next) => {
  const { taskId, subTaskId } = req.params;
  try {
    await taskModel.updateOne(
      { _id: taskId },
      {
        $pull: {
          subTasks: { _id: subTaskId },
        },
      }
    );
  } catch (error) {
    res.json({ message: "Could not find the task", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Deleted successfully", error: false });
};
const addTaskNotes = async (req, res, next) => {
  const { currentDate, user, noteCategory, dueDate, description, noteStatus } =
    req.body;
  const { taskId } = req.params;

  try {
    await taskModel.updateOne(
      { _id: taskId },
      {
        $push: {
          notes: {
            currentDate,
            user,
            noteCategory,
            dueDate,
            description,
            noteStatus,
          },
        },
      }
    );
  } catch (error) {
    res.json({ message: "Could not add the Notes", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Added successfully", error: false });
};
const editTaskNotes = async (req, res, next) => {
  const { currentDate, user, noteCategory, dueDate, description, noteStatus } =
    req.body;
  const { taskId, noteId } = req.params;
  try {
    taskToBeEdited = await taskModel.findById(taskId);
  } catch (error) {
    res.json({ message: "Could not find the task", error: true });
    return next(error);
  }
  taskToBeEdited.notes.forEach((i) => {
    if (i.id == noteId) {
      i.currentDate = currentDate;
      i.user = user;
      i.noteCategory = noteCategory;
      i.dueDate = dueDate;
      i.noteStatus = noteStatus;
      i.description = description;
    }
  });
  try {
    await taskToBeEdited.save();
  } catch (error) {
    res.json({ message: "Enable to edit Notes", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Edited successfully", error: false });
};
const delTaskNote = async (req, res, next) => {
  const { taskId, noteId } = req.params;
  try {
    await taskModel.updateOne(
      { _id: taskId },
      {
        $pull: {
          notes: { _id: noteId },
        },
      }
    );
  } catch (error) {
    res.json({ message: "Could not find the Note", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Deleted successfully", error: false });
};
const addFiles = async (req, res, next) => {
  const { date, user } = req.body;
  const { taskId } = req.params;
  const files = req.files;
  var arr = [];
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
    await taskModel.updateOne(
      { _id: taskId },
      {
        $push: {
          attachments: {
            date: date,
            user: user,
            files: arr,
          },
        },
      }
    );
  } catch (error) {
    res.json({ message: "Could not find the task", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Added successfully", error: false });
};
const arrReturn = (item, arr) => {
  arr.push(item);
};
const editFiles = async (req, res, next) => {
  const { taskId } = req.params;
  const { date, user, id, newFileFlag, editFlag, oldFiles } = req.body;
  const files = req.files;
  let taskToBeEdited;
  if (newFileFlag === "true") {
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
      taskToBeEdited = await taskModel.findById(taskId);
    } catch (error) {
      res.json({ message: "Could not find the attachments", error: true });
      return next(error);
    }
    taskToBeEdited.attachments.forEach((i) => {
      if (i._id.toString() == id) {
        i.date = date;
        i.user = user;
        i.files = arr;
      }
    });
    try {
      await taskToBeEdited.save();
    } catch (error) {
      res.json({ message: "Enable to edit task", error: true });
      return next(error);
    }
    res.status(201).json({ message: "Edited successfully", error: false });
  } else {
    const prevFileArr = JSON.parse(oldFiles);
    try {
      taskToBeEdited = await taskModel.findById(taskId);
    } catch (error) {
      res.json({ message: "Could not find the attachments", error: true });
      return next(error);
    }
    taskToBeEdited.attachments.forEach((i) => {
      if (i._id.toString() == id) {
        i.date = date;
        i.user = user;
        i.files = prevFileArr;
      }
    });
    try {
      await taskToBeEdited.save();
    } catch (error) {
      res.json({ message: "Enable to edit task", error: true });
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
  const { taskId, attachmentId } = req.params;
  const { oldFiles } = req.body;
  try {
    oldFiles.forEach((item) => {
      deleteAwsObj(item);
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Could not find the task", error: true });
    return next(error);
  }
  try {
    await taskModel.updateOne(
      { _id: taskId },
      {
        $pull: {
          attachments: { _id: attachmentId },
        },
      }
    );
  } catch (error) {
    res.json({ message: "Could not find the task", error: true });
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
exports.addTask = addTask;
exports.getTask = getTask;
exports.editTask = editTask;
exports.deleteTask = deleteTask;
exports.addSubTask = addSubTask;
exports.editSubTask = editSubTask;
exports.delSubTasks = delSubTasks;
exports.addTaskNotes = addTaskNotes;
exports.editTaskNotes = editTaskNotes;
exports.delTasksNotes = delTaskNote;
exports.addFiles = addFiles;
exports.editFiles = editFiles;
exports.delFiles = delFiles;
