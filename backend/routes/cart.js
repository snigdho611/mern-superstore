const express = require("express");
const cartController = require("../controller/cartController");
const validator = require("../middleware/validation");
const router = express.Router();

router.get("/get", validator.getCart, cartController.getCart);

router.post("/add-product", (req, res) => {
  console.log(req);
});

router.post("/remove-product", (req, res) => {
  console.log(req);
});

router.post("/delete", (req, res) => {
  console.log(req);
});

router.delete("/");

module.exports = router;
