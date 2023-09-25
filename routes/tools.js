const express = require("express");
const bodyParser = require("body-parser");
var multer = require("multer");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const router = express.Router();
router.use(multer({ limits: { fieldSize: 25 * 1024 * 1024 } }).any());

// user controllers
const toolsCon = require("../controllers/tools.js");
router.get("/", toolsCon.getTools);
router.post("/addTools", toolsCon.addTools);
router.patch("/:toolId", toolsCon.editTools);
router.delete("/:toolId", toolsCon.delTools);
// router.patch("/addInfo/:toolId", toolsCon.addInfo);
// router.patch("/editInfo/:toolId", toolsCon.editInfo);
module.exports = router;
