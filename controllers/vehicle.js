const vehicleModel = require("../models/vehicle");
const addVehicle = async (req, res, next) => {
  const {
    vehicleNo,
    driverWEXPin,
    vinNo,
    tagExperation,
    licensePlate,
    makeModel,
    color,
    year,
    txTag,
    gasCard,
    gasCardLast,
    cardNo,
    trackingInstalled,
    geoTab,
  } = req.body;
  const createVehicleModel = new vehicleModel({
    vehicleNo,
    driverWEXPin,
    vinNo,
    tagExperation,
    licensePlate,
    makeModel,
    color,
    year,
    txTag,
    gasCard,
    gasCardLast,
    cardNo,
    trackingInstalled,
    geoTab,
  });
  try {
    await createVehicleModel.save();
  } catch (error) {
    res.json({ message: "Error adding Vehicle", error: true });
    return next(error);
  }
  res.json({ message: "Created Successfully", error: false });
};
const getVehicle = async (req, res, next) => {
  let vehicles;
  try {
    vehicles = await vehicleModel.find({});
  } catch (error) {
    res.json({ message: "Error finding Vehicle list", error: true });
    return next(error);
  }
  res.json({
    vehicles: vehicles.map((item) => item.toObject({ getters: true })),
    error: false,
  });
};
const editVehicle = async (req, res, next) => {
  const {
    vehicleNo,
    driverWEXPin,
    vinNo,
    tagExperation,
    licensePlate,
    makeModel,
    color,
    year,
    txTag,
    gasCard,
    gasCardLast,
    cardNo,
    trackingInstalled,
    geoTab,
  } = req.body;
  const { vehicleId } = req.params;
  let vehicleToBeEdited;
  try {
    vehicleToBeEdited = await vehicleModel.findById(vehicleId);
  } catch (error) {
    res.json({ message: "Could not find the device", error: true });
    return next(error);
  }
  vehicleToBeEdited.vehicleNo = vehicleNo;
  vehicleToBeEdited.driverWEXPin = driverWEXPin;
  vehicleToBeEdited.vinNo = vinNo;
  vehicleToBeEdited.tagExperation = tagExperation;
  vehicleToBeEdited.licensePlate = licensePlate;
  vehicleToBeEdited.makeModel = makeModel;
  vehicleToBeEdited.color = color;
  vehicleToBeEdited.year = year;
  vehicleToBeEdited.txTag = txTag;
  vehicleToBeEdited.gasCard = gasCard;
  vehicleToBeEdited.gasCardLast = gasCardLast;
  vehicleToBeEdited.cardNo = cardNo;
  vehicleToBeEdited.trackingInstalled = trackingInstalled;
  vehicleToBeEdited.geoTab = geoTab;
  try {
    await vehicleToBeEdited.save();
  } catch (error) {
    res.json({ message: "Enable to edit vehicle", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Edited successfully", error: false });
};
const deleteVehicle = async (req, res, next) => {
  const { vehicleId } = req.params;
  try {
    await vehicleModel.findByIdAndRemove(vehicleId);
  } catch (error) {
    res.json({ message: "Could not found the specific vehicle", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Deleted successfully", error: false });
};
exports.addVehicle = addVehicle;
exports.getVehicle = getVehicle;
exports.editVehicle = editVehicle;
exports.deleteVehicle = deleteVehicle;
