import { Request, NextFunction, Response } from "express";
import { AuthRequest } from "types/commmon";
import { ILogin, IProduct, IUser } from "types/database";

import { Product } from "../model/product";
import { success, failure } from "../utils/commonResponse";
import { HTTP_STATUS } from "../utils/httpStatus";
import { validationResult } from "express-validator";
import Cart from "../model/cart";
import { Login } from "../model/login";
import path from "path";
import ejs from "ejs";
import { promisify } from "util";
import sendMail from "../config/mail";
const ejsRenderFile = ejs.renderFile;

class cartController {
  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      //
      const validatorResult = validationResult(req);
      if (!validatorResult.isEmpty()) {
        return res
          .status(HTTP_STATUS.NOT_ACCEPTABLE)
          .send(failure({ message: "Invalid inputs", error: validatorResult.array() }));
      }
      const cart = await Cart.findOne({ userId: req.body.userId })
        .populate({ path: "itemList.productId" })
        .select("itemList total -_id");
      console.log(cart);
      return res.status(HTTP_STATUS.OK).send(success({ message: "Got cart successfully.", data: cart }));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async addProductToCart(req: any, res: Response, next: NextFunction) {
    try {
      const validatorResult = validationResult(req);
      if (!validatorResult.isEmpty()) {
        return res
          .status(HTTP_STATUS.NOT_ACCEPTABLE)
          .send(failure({ message: "Invalid inputs", error: validatorResult.array() }));
      }
      const cart = await Cart.findOne({ userId: req.body.userId })
        .populate({ path: "itemList.productId" })
        .exec();
      const product: IProduct | null = await Product.findOne({ _id: req.body.productId });
      if (product) {
        if (cart) {
          console.log("User already has a cart");
          await cart.addToCart(product._id);
          return res.status(HTTP_STATUS.OK).send(success({ message: "Incremented product to cart" }));
        } else {
          console.log("User doesn't have a cart");
          // console.log(req.user._id)
          const newCart = new Cart({ userId: req.user._id, itemList: [], total: 0 });
          await newCart.save();
          await newCart.addToCart(product._id);
          return res.status(HTTP_STATUS.OK).send(success({ message: "Created new cart for user" }));
        }
      } else {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure({ message: "No product of such ID exists" }));
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async removeProductFromCart(req: Request, res: Response, next: NextFunction) {
    try {
      const validatorResult = validationResult(req);
      if (!validatorResult.isEmpty()) {
        return res
          .status(HTTP_STATUS.NOT_ACCEPTABLE)
          .send(failure({ message: "Invalid inputs", error: validatorResult.array() }));
      }
      const cart = await Cart.findOne({ userId: req.body.userId })
        .populate({ path: "itemList.productId" })
        .exec();
      const product = await Product.findOne({ _id: req.body.productId });
      if (product) {
        if (cart) {
          console.log("User already has a cart");
          await cart.removeFromCart(product._id);
          return res.status(HTTP_STATUS.OK).send(success({ message: "Decremented product to cart" }));
        } else {
          console.log("User doesn't have a cart");
          return res.status(HTTP_STATUS.OK).send(success({ message: "Cart does not exist" }));
        }
      } else {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure({ message: "No product of such ID exists" }));
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // Needs Refactoring
  // Send email when customer is checking out
  async sendCheckoutEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const validatorResult = validationResult(req);
      if (!validatorResult.isEmpty()) {
        return res
          .status(HTTP_STATUS.NOT_ACCEPTABLE)
          .send(failure({ message: "Invalid inputs", error: validatorResult.array() }));
      }

      // const cart = await Cart.findOne({ userId: req.body.userId }).populate("userId").exec();
      const login: ILogin | null = await Login.findOne({ _id: req.body.userId }).populate("userId").exec();
      // if (cart) {
      if (login) {
        const htmlStr = await ejsRenderFile(path.join(__dirname, "..", "mails", "Checkout.ejs"), {
          name: `${(login.userId as IUser).firstName} ${(login.userId as IUser).lastName}`,
        });

        sendMail({
          from: "ABC Store <mail@abcstore.com>",
          to: login.email,
          subject: "Thank you for purchasing",
          html: htmlStr,
        });
        return res.status(HTTP_STATUS.OK).send(success({ message: "Successfully requested for email" }));
      } else {
        return res.status(HTTP_STATUS.NOT_ACCEPTABLE).send(failure({ message: "Failed to find user" }));
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteCart(req: Request, res: Response, next: NextFunction) {
    try {
      //
      // const u
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

const CartController = new cartController();
export default CartController;
