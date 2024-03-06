const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const usersRoutes = require("./routes/users");
const usersTypeRoutes = require("./routes/userType");
const reimbursalTypeRoutes = require("./routes/reimbursalType");
const phaseRoutes = require("./routes/phase");
const jobTypeRoutes = require("./routes/jobType");
const jobTagRoutes = require("./routes/jobTag");
const jobPMRoutes = require("./routes/jobPM");
const jobCTMRoutes = require("./routes/jobCTM");
const jobRoutes = require("./routes/job");
const taxCodeRoutes = require("./routes/taxCode");
const customerTypeRoutes = require("./routes/customerType");
const materialLevelRoutes = require("./routes/materialLevel");
const laborLevelRoutes = require("./routes/laborLevel");
const customerTermRoutes = require("./routes/customerTerm");
const positionRoutes = require("./routes/position");
const deviceRoutes = require("./routes/devices");
const vehicleRoutes = require("./routes/vehicle");
const toolsRoutes = require("./routes/tools");
const toolsCategoryRoutes = require("./routes/toolCategory");
const deviceCategoryRoutes = require("./routes/deviceCategory");
const taskCategoryRoutes = require("./routes/taskCategory");
const taskStatusRoutes = require("./routes/taskStatus");
const notesStatusRoutes = require("./routes/notesStatus");
const notesCategoryRoutes = require("./routes/notesCategory");
const salesPersonRoutes = require("./routes/salesPerson");
const subtoolsCategoryRoutes = require("./routes/subtoolCategory");
const clientRoutes = require("./routes/client");
const timeTrackRoutes = require("./routes/timeTrack");
const vehicleInspectionRoutes = require("./routes/vehicleInspection");
const accidentReportRoutes = require("./routes/accidentReport");
const taskRoutes = require("./routes/task");
const tagoutRoutes = require("./routes/tagout");
const taskPriorityRoutes = require("./routes/taskPriority");
const needTagRoutes = require("./routes/needTag");
const toolDamageRoutes = require("./routes/toolDamage");
const chatRoutes = require("./routes/chat");
const messageRoutes = require("./routes/message");
const checkedOutRoutes = require("./routes/checkedOut");
const jobNumberRoutes = require("./routes/jobNumber");

const url = process.env.MONGO_DB_KEY;
mongoose
  .connect(url)
  .then(() => {
    console.log("Connection Established");
  })
  .catch((err) => {
    console.log("error occured while connecting to database", err);
  });

app.use("/api/users", usersRoutes);
app.use("/api/userType", usersTypeRoutes);
app.use("/api/reimbursalType", reimbursalTypeRoutes);
app.use("/api/customerType", customerTypeRoutes);
app.use("/api/materialLevel", materialLevelRoutes);
app.use("/api/laborLevel", laborLevelRoutes);
app.use("/api/customerTerm", customerTermRoutes);
app.use("/api/position", positionRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/tools", toolsRoutes);
app.use("/api/toolCategory", toolsCategoryRoutes);
app.use("/api/deviceCategory", deviceCategoryRoutes);
app.use("/api/taskCategory", taskCategoryRoutes);
app.use("/api/notesCategory", notesCategoryRoutes);
app.use("/api/taskStatus", taskStatusRoutes);
app.use("/api/taskPriority", taskPriorityRoutes);
app.use("/api/notesStatus", notesStatusRoutes);
app.use("/api/taxCode", taxCodeRoutes);
app.use("/api/subtoolCategory", subtoolsCategoryRoutes);
app.use("/api/salesPersonCode", salesPersonRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/jobType", jobTypeRoutes);
app.use("/api/jobTag", jobTagRoutes);
app.use("/api/jobPM", jobPMRoutes);
app.use("/api/jobCTM", jobCTMRoutes);
app.use("/api/phase", phaseRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/timeTrack", timeTrackRoutes);
app.use("/api/vehicleInspection", vehicleInspectionRoutes);
app.use("/api/accidentReport", accidentReportRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/tagout", tagoutRoutes);
app.use("/api/needTag", needTagRoutes);
app.use("/api/toolDamage", toolDamageRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/checkedOut", checkedOutRoutes);
app.use("/api/jobNumber", jobNumberRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
});
