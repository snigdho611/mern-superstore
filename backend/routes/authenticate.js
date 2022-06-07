const express = require("express");
const authenticateController = require("../controller/authentincateController");
const validator = require("../middleware/validation");
const router = express.Router();

router.post("/login", validator.login, authenticateController.login);

router.post("/signup", validator.signup, authenticateController.signup);

module.exports = router;
