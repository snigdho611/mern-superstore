const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const validator = require("../middleware/validation");
const { checkAuth, isAdmin } = require("../middleware/authenticate");

router.post("/products/add", checkAuth, isAdmin, validator.addProduct, adminController.addProduct);
router.put(
  "/products/edit",
  checkAuth,
  isAdmin,
  validator.updateProduct,
  adminController.editProduct
);
router.delete(
  "/products/delete",
  checkAuth,
  validator.deleteProduct,
  adminController.deleteProduct
);

module.exports = router;
