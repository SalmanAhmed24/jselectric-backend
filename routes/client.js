const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const router = express.Router();
// user controllers
const clientCon = require("../controllers/client.js");
router.get("/", clientCon.getClient);
router.post("/addClient", clientCon.addClient);
router.patch("/:clientId", clientCon.editClient);
router.delete("/:clientId", clientCon.deleteClient);
module.exports = router;
