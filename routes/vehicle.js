const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const router = express.Router();
router.use(multer().array("files", 12));

// user controllers
const vehicleCon = require("../controllers/vehicle.js");
router.get("/", vehicleCon.getVehicle);
router.post("/addVehicle", vehicleCon.addVehicle);
router.patch("/:vehicleId", vehicleCon.editVehicle);
router.delete("/:vehicleId", vehicleCon.deleteVehicle);
router.patch("/addFiles/:vehicleId", vehicleCon.addFiles);
router.patch("/editFiles/:vehicleId", vehicleCon.editFiles);
router.patch("/delFiles/:vehicleId&&:attachmentId", vehicleCon.delFiles);
module.exports = router;
