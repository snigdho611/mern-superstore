import { Request, NextFunction, Response } from "express";
import { IProduct } from "types/database";

const Product = require("../model/product");
const { success, failure } = require("../utils/commonResponse");
const HTTP_STATUS = require("../utils/httpStatus");
const { validationResult } = require("express-validator");
const Cart = require("../model/cart");
const Login = require("../model/login");
const path = require("path");
const ejs = require("ejs");
const { promisify } = require("util");
const sendMail = require("../config/mail");
const ejsRenderFile = promisify(ejs.renderFile);

class cartController {
  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      //
      const validatorResult = validationResult(req);
      if (!validatorResult.isEmpty()) {
        return res
          .status(HTTP_STATUS.NOT_ACCEPTABLE)
          .send(failure("Invalid inputs", validatorResult.array()));
      }
      const cart = await Cart.findOne({ userId: req.body.userId })
        .populate({ path: "itemList.productId" })
        .select("itemList total -_id");
      console.log(cart);
      return res.status(HTTP_STATUS.OK).send(success("Got cart successfully.", cart));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async addProductToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const validatorResult = validationResult(req);
      if (!validatorResult.isEmpty()) {
        return res
          .status(HTTP_STATUS.NOT_ACCEPTABLE)
          .send(failure("Invalid inputs", validatorResult.array()));
      }
      const cart = await Cart.findOne({ userId: req.body.userId })
        .populate({ path: "itemList.productId" })
        .exec();
      const product: IProduct | null = await Product.findOne({ _id: req.body.productId });
      if (product) {
        if (cart) {
          console.log("User already has a cart");
          await cart.addToCart(product._id);
          return res.status(HTTP_STATUS.OK).send(success("Incremented product to cart"));
        } else {
          console.log("User doesn't have a cart");
          // console.log(req.user._id)
          const newCart = new Cart({ userId: req.user._id, itemList: [], total: 0 });
          await newCart.save();
          await newCart.addToCart(product._id);
          return res.status(HTTP_STATUS.OK).send(success("Created new cart for user"));
        }
      } else {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("No product of such ID exists"));
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
          .send(failure("Invalid inputs", validatorResult.array()));
      }
      const cart = await Cart.findOne({ userId: req.body.userId })
        .populate({ path: "itemList.productId" })
        .exec();
      const product = await Product.findOne({ _id: req.body.productId });
      if (product) {
        if (cart) {
          console.log("User already has a cart");
          await cart.removeFromCart(product._id);
          return res.status(HTTP_STATUS.OK).send(success("Decremented product to cart"));
        } else {
          console.log("User doesn't have a cart");
          return res.status(HTTP_STATUS.OK).send(success("Cart does not exist"));
        }
      } else {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("No product of such ID exists"));
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
          .send(failure("Invalid inputs", validatorResult.array()));
      }

      // const cart = await Cart.findOne({ userId: req.body.userId }).populate("userId").exec();
      const login = await Login.findOne({ _id: req.body.userId }).populate("userId").exec();
      // if (cart) {
      if (login) {
        const htmlStr = await ejsRenderFile(path.join(__dirname, "..", "mails", "Checkout.ejs"), {
          name: `${login.userId.firstName} ${login.userId.lastName}`,
        });

        sendMail({
          from: "ABC Store <mail@abcstore.com>",
          to: login.email,
          subject: "Thank you for purchasing",
          html: htmlStr,
        });
        return res.status(HTTP_STATUS.OK).send(success("Successfully requested for email"));
      } else {
        return res.status(HTTP_STATUS.NOT_ACCEPTABLE).send(failure("Failed to find user"));
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

module.exports = new cartController();
