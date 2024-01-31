const timeTrackModel = require("../models/timeTrack");
const addTimeTrack = async (req, res, next) => {
  const {
    employee,
    job,
    phase,
    date,
    startTime,
    endTime,
    lunch,
    spectrum,
    user,
    lunchTime,
  } = req.body;
  const createTimeTrackModel = new timeTrackModel({
    employee,
    job,
    phase,
    date,
    startTime,
    endTime,
    spectrum,
    user,
    lunch,
    lunchTime,
  });
  try {
    await createTimeTrackModel.save();
  } catch (error) {
    res.json({ message: "Error adding Time Track", error: true });
    return next(error);
  }
  res.json({ message: "Created Successfully", error: false });
};
const getTimeTrack = async (req, res, next) => {
  let timeTracks;
  try {
    timeTracks = await timeTrackModel.find({});
  } catch (error) {
    res.json({ message: "Error finding time Track", error: true });
    return next(error);
  }
  res.json({
    timeTracks: timeTracks.map((item) => item.toObject({ getters: true })),
    error: false,
  });
};
const editTimeTrack = async (req, res, next) => {
  const {
    employee,
    job,
    phase,
    date,
    startTime,
    endTime,
    spectrum,
    user,
    lunch,
    lunchTime,
  } = req.body;
  const { timeTrackId } = req.params;
  let timeTrackToBeEdited;
  try {
    timeTrackToBeEdited = await timeTrackModel.findById(timeTrackId);
  } catch (error) {
    res.json({ message: "Could not find the timeTrack", error: true });
    return next(error);
  }
  timeTrackToBeEdited.employee = employee;
  timeTrackToBeEdited.job = job;
  timeTrackToBeEdited.phase = phase;
  timeTrackToBeEdited.date = date;
  timeTrackToBeEdited.startTime = startTime;
  timeTrackToBeEdited.endTime = endTime;
  timeTrackToBeEdited.spectrum = spectrum;
  timeTrackToBeEdited.user = user;
  timeTrackToBeEdited.lunch = lunch;
  timeTrackToBeEdited.lunchTime = lunchTime;
  try {
    await timeTrackToBeEdited.save();
  } catch (error) {
    res.json({ message: "Enable to edit time Track", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Edited successfully", error: false });
};
const deleteTimeTrack = async (req, res, next) => {
  const { timeTrackId } = req.params;
  try {
    await timeTrackModel.findByIdAndRemove(timeTrackId);
  } catch (error) {
    res.json({
      message: "Could not found the specific time track",
      error: true,
    });
    return next(error);
  }
  res.status(201).json({ message: "Deleted successfully", error: false });
};
const getByEmp = async (req, res, next) => {
  const { search } = req.params;
  let allTimeTrack;
  try {
    allTimeTrack = await timeTrackModel.find({
      employee: { $regex: search, $options: "i" },
    });
  } catch (error) {
    res.json({ message: "Error finding time track list", error: true });
    return next(error);
  }
  res.json({
    timeTrack: allTimeTrack.map((item) => item.toObject({ getters: true })),
    error: false,
  });
};
exports.addTimeTrack = addTimeTrack;
exports.getTimeTrack = getTimeTrack;
exports.editTimeTrack = editTimeTrack;
exports.deleteTimeTrack = deleteTimeTrack;
exports.getByEmp = getByEmp;
