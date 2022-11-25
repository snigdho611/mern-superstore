import { Request, Response } from "express";
import express from "express";
import CartController from "../controller/cartController";
import { isAdmin, checkAuth } from "../middleware/authenticate";
import validator from "../middleware/validation";
const router = express.Router();

router.post("/get", checkAuth, validator.getCart, CartController.getCart);

router.post("/add-product",
  // checkAuth, 
  validator.addToCart, CartController.addProductToCart);

router.post(
  "/remove-product",
  // checkAuth,
  validator.removeProduct,
  CartController.removeProductFromCart
);

router.post("/delete", (req: Request, res: Response) => {
  console.log(req);
});
router.post(
  "/checkout-email",
  // checkAuth,
  validator.sendCheckoutEmail,
  CartController.sendCheckoutEmail
);

router.delete("/");

export default router;
