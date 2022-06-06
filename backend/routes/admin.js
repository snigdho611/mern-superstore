const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const validator = require("../middleware/validation");
const multer = require("multer");
const path = require("path");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file) {
      cb(null, "files");
    } else {
      cb("No file found", null);
    }
  },
  filename: (req, file, cb) => {
    if (file) {
      cb(
        null,
        file.originalname.split(".")[0].replace(/\ /g, "") +
          Date.now() +
          path.extname(file.originalname)
      );
    } else {
      cb("No file found", null);
    }
  },
});

const checkImage = (req, file, cb) => {
  if (file) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } else {
    cb("No file found", false);
  }
};

const upload = multer({
  storage: fileStorage,
  limits: 30000,
  fileFilter: checkImage,
});

router.post(
  "/products/add",
  upload.single("productImage"),
  validator.addProduct,
  adminController.addProduct
);
router.put(
  "/products/edit",
  upload.single("productImage"),
  validator.updateProduct,
  adminController.editProduct
);
router.delete("/products/delete", validator.deleteProduct, adminController.deleteProduct);

module.exports = router;
