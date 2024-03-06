const jobNumberModel = require("../models/jobNumber");
const addJobNumber = async (req, res, next) => {
  const {
    jobTag,
    number,
    jobPM,
    jobName,
    client,
    dateCreated,
    dateBilled,
    jobCTM,
    amount,
    POContract,
    changeOrder,
    percentageBilled,
    notes,
  } = req.body;
  const createJobNumber = new jobNumberModel({
    jobTag,
    number,
    jobPM,
    jobName,
    client,
    dateCreated,
    dateBilled,
    jobCTM,
    amount,
    POContract,
    changeOrder,
    percentageBilled,
    notes,
  });
  try {
    await createJobNumber.save();
  } catch (error) {
    res.json({ message: "Error adding Job Number", error: true });
    return next(error);
  }
  res.json({ message: "Created Successfully", error: false });
};
const getJobNumber = async (req, res, next) => {
  let jobNumbers;
  try {
    jobNumbers = await jobNumberModel.find({});
  } catch (error) {
    res.json({ message: "Error finding Job Number list", error: true });
    return next(error);
  }
  res.json({
    jobNumbers: jobNumbers.map((item) => item.toObject({ getters: true })),
    error: false,
  });
};
const editJobNumber = async (req, res, next) => {
  const {
    jobTag,
    number,
    jobPM,
    jobName,
    client,
    dateCreated,
    dateBilled,
    jobCTM,
    amount,
    POContract,
    changeOrder,
    percentageBilled,
    notes,
  } = req.body;
  const { jobNumberId } = req.params;
  let jobNoToBeEdited;
  try {
    jobNoToBeEdited = await jobNumberModel.findById(jobNumberId);
  } catch (error) {
    res.json({ message: "Could not find job Number", error: true });
    return next(error);
  }
  jobNoToBeEdited.jobTag = jobTag;
  jobNoToBeEdited.number = number;
  jobNoToBeEdited.jobPM = jobPM;
  jobNoToBeEdited.jobName = jobName;
  jobNoToBeEdited.client = client;
  jobNoToBeEdited.dateCreated = dateCreated;
  jobNoToBeEdited.dateBilled = dateBilled;
  jobNoToBeEdited.jobCTM = jobCTM;
  jobNoToBeEdited.amount = amount;
  jobNoToBeEdited.POContract = POContract;
  jobNoToBeEdited.changeOrder = changeOrder;
  jobNoToBeEdited.percentageBilled = percentageBilled;
  jobNoToBeEdited.notes = notes;
  try {
    await jobNoToBeEdited.save();
  } catch (error) {
    res.json({ message: "Enable to edit job Number", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Edited successfully", error: false });
};
const deleteJobNumber = async (req, res, next) => {
  const { jobNumberId } = req.params;
  try {
    await jobNumberModel.findByIdAndRemove(jobNumberId);
  } catch (error) {
    res.json({
      message: "Could not found the specific Job Number",
      error: true,
    });
    return next(error);
  }
  res.status(201).json({ message: "Deleted successfully", error: false });
};
exports.addJobNumber = addJobNumber;
exports.getJobNumber = getJobNumber;
exports.editJobNumber = editJobNumber;
exports.deleteJobNumber = deleteJobNumber;
