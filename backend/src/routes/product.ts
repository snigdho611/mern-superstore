import express, { Router } from "express";
const router: Router = express.Router();
import ProductController from "../controller/productController";
import validator from "../middleware/validation";

router.get("/all", ProductController.getAll);
router.get("/details/:productId", ProductController.getOne);
router.get(
  "/search/:category/:searchParams",
  validator.searchProduct,
  ProductController.searchProduct
);

export default router;
