const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const validator = require("../middleware/validation");

router.post("/products/add", validator.addProduct, adminController.addProduct);
router.put("/products/edit", validator.updateProduct, adminController.editProduct);
router.delete("/products/delete", validator.deleteProduct, adminController.deleteProduct);

module.exports = router;
