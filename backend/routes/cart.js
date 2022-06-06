const express = require("express");
const cartController = require("../controller/cartController");
const validator = require("../middleware/validation");
const router = express.Router();

router.post("/get", validator.getCart, cartController.getCart);

router.post("/add-product", validator.addToCart, cartController.addProductToCart);

router.post("/remove-product", validator.removeProduct, cartController.removeProductFromCart);

router.post("/delete", (req, res) => {
  console.log(req);
});

router.delete("/");

module.exports = router;
