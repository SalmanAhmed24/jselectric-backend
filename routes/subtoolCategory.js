const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const router = express.Router();
// user controllers
const subtoolCategoryCon = require("../controllers/subtoolCategory.js");
router.get("/", subtoolCategoryCon.getsubtoolCategory);
router.post("/addsubtoolCategory", subtoolCategoryCon.addsubtoolCategory);
router.patch("/:subtoolCategoryId", subtoolCategoryCon.editsubtoolCategory);
router.delete("/:subtoolCategoryId", subtoolCategoryCon.deletesubtoolCategory);
module.exports = router;
