const express = require("express");
const bodyParser = require("body-parser");
var multer = require("multer");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const router = express.Router();
router.use(multer().array(["files"], 12));

// user controllers
const needTagCon = require("../controllers/needTag");
router.get("/", needTagCon.getNeedTag);
router.post("/addNeedTag", needTagCon.addNeedTag);
router.patch("/:needTagId", needTagCon.editNeedTag);
router.put("/:needTagId", needTagCon.delNeedTag);
module.exports = router;
