const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.get("/all", productController.getAll);
router.get("/:productId", productController.getOne);

// router.post("/add-product", validator.addProduct, productController.addProduct);

module.exports = router;
