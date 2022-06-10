const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const validator = require("../middleware/validation");
const { checkAuth, isAdmin } = require("../middleware/authenticate");
const multer = require("multer");
const path = require("path");
const fileUploader = require("../middleware/files");

router.post(
  "/products/add",
  // checkAuth,
  // isAdmin,
  fileUploader.single("productImage"),
  validator.addProduct,
  adminController.addProduct
);

router.put(
  "/products/edit",
  // checkAuth,
  // isAdmin,
  validator.updateProduct,
  adminController.updateProduct
);

router.post(
  "/products/update-image",
  // checkAuth,
  // isAdmin,
  fileUploader.single("productImage"),
  validator.updateImage,
  adminController.updateImage
);

router.delete(
  "/products/delete",
  // checkAuth,
  // isAdmin,
  validator.deleteProduct,
  adminController.deleteProduct
);

module.exports = router;
