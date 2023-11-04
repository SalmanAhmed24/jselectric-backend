const clientsModel = require("../models/client");
const addClient = async (req, res, next) => {
  const {
    customerCode,
    customerName,
    alphaCode,
    address,
    city,
    state,
    zipCode,
    phone,
    fax,
    primaryContact,
    customerType,
    balance,
    taxable,
    status,
    customerTerm,
    taxCode,
    retailCertificate,
    resaleExpDate,
    salesPersonCode,
    receiveStatements,
    financeCharge,
    retention,
    lastDateBilled,
    lastDatePaid,
    dateEstablished,
    creditLimit,
    materialLevel,
    laborLevel,
    primaryEmail,
    secondaryEmail,
  } = req.body;
  const createClientModel = new clientsModel({
    customerCode,
    customerName,
    alphaCode,
    address,
    city,
    state,
    zipCode,
    phone,
    fax,
    primaryContact,
    customerType,
    balance,
    taxable,
    status,
    customerTerm,
    taxCode,
    retailCertificate,
    resaleExpDate,
    salesPersonCode,
    receiveStatements,
    financeCharge,
    retention,
    lastDateBilled,
    lastDatePaid,
    dateEstablished,
    creditLimit,
    materialLevel,
    laborLevel,
    primaryEmail,
    secondaryEmail,
  });
  try {
    await createClientModel.save();
  } catch (error) {
    res.json({ message: "Error adding Cliebt", error: true });
    return next(error);
  }
  res.json({ message: "Created Successfully", error: false });
};
const getClient = async (req, res, next) => {
  let clients;
  try {
    clients = await clientsModel.find({});
  } catch (error) {
    res.json({ message: "Error finding Device list", error: true });
    return next(error);
  }
  res.json({
    clients: clients.map((item) => item.toObject({ getters: true })),
    error: false,
  });
};
const editClient = async (req, res, next) => {
  const {
    customerCode,
    customerName,
    alphaCode,
    address,
    city,
    state,
    zipCode,
    phone,
    fax,
    primaryContact,
    customerType,
    balance,
    taxable,
    status,
    customerTerm,
    taxCode,
    retailCertificate,
    resaleExpDate,
    salesPersonCode,
    receiveStatements,
    financeCharge,
    retention,
    lastDateBilled,
    lastDatePaid,
    primaryEmail,
    secondaryEmail,
    dateEstablished,
    creditLimit,
    materialLevel,
    laborLevel,
  } = req.body;
  const { clientId } = req.params;
  let clientToBeEdited;
  try {
    clientToBeEdited = await clientsModel.findById(clientId);
  } catch (error) {
    res.json({ message: "Could not find the client", error: true });
    return next(error);
  }
  clientToBeEdited.customerCode = customerCode;
  clientToBeEdited.customerName = customerName;
  clientToBeEdited.alphaCode = alphaCode;
  clientToBeEdited.address = address;
  clientToBeEdited.city = city;
  clientToBeEdited.state = state;
  clientToBeEdited.zipCode = zipCode;
  clientToBeEdited.phone = phone;
  clientToBeEdited.fax = fax;
  clientToBeEdited.primaryContact = primaryContact;
  clientToBeEdited.customerType = customerType;
  clientToBeEdited.balance = balance;
  clientToBeEdited.taxable = taxable;
  clientToBeEdited.status = status;
  clientToBeEdited.customerTerm = customerTerm;
  clientToBeEdited.taxCode = taxCode;
  clientToBeEdited.retailCertificate = retailCertificate;
  clientToBeEdited.resaleExpDate = resaleExpDate;
  clientToBeEdited.salesPersonCode = salesPersonCode;
  clientToBeEdited.receiveStatements = receiveStatements;
  clientToBeEdited.financeCharge = financeCharge;
  clientToBeEdited.retention = retention;
  clientToBeEdited.lastDateBilled = lastDateBilled;
  clientToBeEdited.lastDatePaid = lastDatePaid;
  clientToBeEdited.primaryEmail = primaryEmail;
  clientToBeEdited.secondaryEmail = secondaryEmail;
  clientToBeEdited.dateEstablished = dateEstablished;
  clientToBeEdited.creditLimit = creditLimit;
  clientToBeEdited.materialLevel = materialLevel;
  clientToBeEdited.laborLevel = laborLevel;
  try {
    await clientToBeEdited.save();
  } catch (error) {
    res.json({ message: "Enable to edit client", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Edited successfully", error: false });
};
const deleteClient = async (req, res, next) => {
  const { clientId } = req.params;
  try {
    await clientsModel.findByIdAndRemove(clientId);
  } catch (error) {
    res.json({ message: "Could not found the specific client", error: true });
    return next(error);
  }
  res.status(201).json({ message: "Deleted successfully", error: false });
};
const getCustomerByName = async (req, res, next) => {
  const { name } = req.params;
  let allClients;
  try {
    allClients = await clientsModel.find({
      customerName: { $regex: name, $options: "i" },
    });
  } catch (error) {
    res.json({ message: "Error finding users list", error: true });
    return next(error);
  }
  res.json({
    clients: allClients.map((item) => item.toObject({ getters: true })),
    error: false,
  });
};
exports.addClient = addClient;
exports.getClient = getClient;
exports.editClient = editClient;
exports.deleteClient = deleteClient;
exports.getCustomerByName = getCustomerByName;
