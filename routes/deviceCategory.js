const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const router = express.Router();
// user controllers
const deviceCategoryCon = require("../controllers/deviceCategory.js");
router.get("/", deviceCategoryCon.getdeviceCategory);
router.post("/adddeviceCategory", deviceCategoryCon.adddeviceCategory);
router.patch("/:deviceCategoryId", deviceCategoryCon.editdeviceCategory);
router.delete("/:deviceCategoryId", deviceCategoryCon.deletedeviceCategory);
module.exports = router;
