const express = require("express");
const cartController = require("../controller/cartController");
const { isAdmin, checkAuth } = require("../middleware/authenticate");
const validator = require("../middleware/validation");
const router = express.Router();

router.post("/get", checkAuth, validator.getCart, cartController.getCart);

router.post("/add-product", checkAuth, validator.addToCart, cartController.addProductToCart);

router.post(
  "/remove-product",
  checkAuth,
  validator.removeProduct,
  cartController.removeProductFromCart
);

router.post("/delete", (req, res) => {
  console.log(req);
});

router.delete("/");

module.exports = router;
