import express from "express";
const router = express.Router();
const productController = require("../controller/productController");
const validator = require("../middleware/validation");

router.get("/all", productController.getAll);
router.get("/details/:productId", productController.getOne);
router.get(
  "/search/:category/:searchParams",
  validator.searchProduct,
  productController.searchProduct
);
// router.get("/checkout/send", )

// router.post("/add-product", validator.addProduct, productController.addProduct);

module.exports = router;
