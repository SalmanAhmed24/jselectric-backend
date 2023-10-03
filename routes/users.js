const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json({ limit: "50MB" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50MB" }));
var multer = require("multer");

const router = express.Router();
// user controllers
router.use(multer().any());
const userCon = require("../controllers/user.js");
router.get("/", userCon.getUsers);
router.post("/addUser", userCon.addUser);
router.patch("/:userId", userCon.editUser);
router.delete("/:userId", userCon.deleteUser);
router.patch("/addBadges/:userId", userCon.addBadges);
router.patch("/editBadges/:userId", userCon.editBadges);
router.patch("/addNotes/:userId", userCon.addNotes);
router.patch("/editNotes/:userId", userCon.editNotes);
router.delete("/delNotes/:userId&&:noteId", userCon.delNotes);
router.patch("/addFiles/:userId", userCon.addFiles);
router.post("/login", userCon.loginUser);
module.exports = router;
