const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const usersRoutes = require("./routes/users");
const usersTypeRoutes = require("./routes/userType");
const positionRoutes = require("./routes/position");
const deviceRoutes = require("./routes/devices");
const vehicleRoutes = require("./routes/vehicle");
const toolsRoutes = require("./routes/tools");
const toolsCategoryRoutes = require("./routes/toolCategory");
const deviceCategoryRoutes = require("./routes/deviceCategory");

const subtoolsCategoryRoutes = require("./routes/subtoolCategory");

const url =
  "mongodb+srv://book-a-tutorDB:reactive_007@cluster0.2art5.mongodb.net/jselectric";
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
app.use("/api/position", positionRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/tools", toolsRoutes);
app.use("/api/toolCategory", toolsCategoryRoutes);
app.use("/api/deviceCategory", deviceCategoryRoutes);

app.use("/api/subtoolCategory", subtoolsCategoryRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
});
