const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const validator = require("../middleware/validation");

router.post("/products/add-product", validator.addProduct, adminController.addProduct);

module.exports = router;
