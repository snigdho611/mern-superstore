const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.get("/all", productController.getAll);

module.exports = router;
