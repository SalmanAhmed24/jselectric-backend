const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const router = express.Router();
// user controllers
const userTypeCon = require("../controllers/userType.js");
router.get("/", userTypeCon.getUsersType);
router.post("/addUserType", userTypeCon.addUserType);
router.patch("/:userTypeId", userTypeCon.editUserType);
router.delete("/:userTypeId", userTypeCon.deleteUserType);
module.exports = router;
