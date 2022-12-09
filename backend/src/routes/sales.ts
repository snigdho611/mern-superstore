import express, { Router } from "express";
const router: Router = express.Router();
import SaleController from "../controller/saleController";
import validator from "../middleware/validation";

router.get("/customer/:customerId", SaleController.getSalesByCustomer);
router.post("/customer/checkout", validator.addSale, SaleController.addSale);

export default router;
