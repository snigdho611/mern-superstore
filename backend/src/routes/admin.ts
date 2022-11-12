import express from "express";
const router = express.Router();
import AdminController from "../controller/adminController";
import validator from "../middleware/validation";
import { checkAuth, isAdmin } from "../middleware/authenticate";
import { fileUploader } from "../middleware/files";

router.post(
  "/products/add",
  // checkAuth,
  // isAdmin,
  fileUploader.single("productImage"),
  validator.addProduct,
  AdminController.addProduct
);

router.put(
  "/products/edit",
  // checkAuth,
  // isAdmin,
  validator.updateProduct,
  AdminController.updateProduct
);

router.post(
  "/products/update-image",
  // checkAuth,
  // isAdmin,
  fileUploader.single("productImage"),
  // (req, res) => {
  //   console.log(req);
  // }
  validator.updateImage,
  AdminController.updateImage
);

router.delete(
  "/products/delete/:productId",
  // checkAuth,
  // isAdmin,
  validator.deleteProduct,
  AdminController.deleteProduct
);

export default router;
