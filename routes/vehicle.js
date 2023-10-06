const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const router = express.Router();
// user controllers
const vehicleCon = require("../controllers/vehicle.js");
router.get("/", vehicleCon.getVehicle);
router.post("/addVehicle", vehicleCon.addVehicle);
router.patch("/:vehicleId", vehicleCon.editVehicle);
router.delete("/:vehicleId", vehicleCon.deleteVehicle);
module.exports = router;
