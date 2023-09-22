const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const router = express.Router();
var multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

// user controllers
const toolsCon = require("../controllers/tools.js");
router.get("/", toolsCon.getTools);
router.post("/addTools", toolsCon.addTools);
router.patch("/:toolId", toolsCon.editTools);
router.delete("/:toolId", toolsCon.delTools);
router.patch("/addInfo/:toolId", upload.single("image"), toolsCon.addInfo);
router.patch("/editInfo/:toolId", toolsCon.editInfo);
router.patch("/deleteInfo/:toolId", toolsCon.delInfo);
module.exports = router;
