const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const router = express.Router();
// user controllers
const chatCon = require("../controllers/chat");
router.get("/:loggedInUserId", chatCon.getChat);
router.post("/addChat", chatCon.addChat);
router.post("/groupChat", chatCon.createGroupChat);
router.put("/groupRemoveUser", chatCon.removeFromGroup);
router.put("/groupAddUser", chatCon.addToGroup);
module.exports = router;
