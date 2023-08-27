const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const router = express.Router();
// user controllers
const userCon = require("../controllers/user.js");
router.get("/", userCon.getUsers);
router.post("/addUser", userCon.addUser);
router.patch("/:userId", userCon.editUser);
router.delete("/:userId", userCon.deleteUser);
router.patch("/addBadges/:userId", userCon.addBadges);
router.patch("/editBadges/:userId", userCon.editBadges);
router.post("/login", userCon.loginUser);
module.exports = router;
