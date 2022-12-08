import express, { Router } from "express";
const router: Router = express.Router();
import SaleController from "../controller/saleController";
import validator from "../middleware/validation";

// router.get("/all", ProductController.getAll);
// router.get("/details/:productId", ProductController.getOne);
// router.get(
//     "/search/:category/:searchParams",
//     validator.searchProduct,
//     ProductController.searchProduct
// );

router.get("/all", SaleController.getAll);
router.get("/customer/:customerId", SaleController.getSalesByCustomer);
router.post("/customer/checkout", validator.addSale, SaleController.addSale);

export default router;
