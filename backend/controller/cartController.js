const Product = require("../model/product");
const { success, failure } = require("../utils/commonResponse");
const HTTP_STATUS = require("../utils/httpStatus");
const { validationResult } = require("express-validator");
const Cart = require("../model/cart");

class cartController {
  async getCart(req, res, next) {
    try {
      //
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(HTTP_STATUS.NOT_ACCEPTABLE)
          .send(failure("Invalid inputs", errors.array()));
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

  async addProductToCart(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(HTTP_STATUS.NOT_ACCEPTABLE)
          .send(failure("Invalid inputs", errors.array()));
      }
      const cart = await Cart.findOne({ userId: req.body.userId })
        .populate({ path: "itemList.productId" })
        .exec();
      const product = await Product.findOne({ _id: req.body.productId });
      if (product) {
        if (cart) {
          console.log("User already has a cart");
          await cart.addToCart(product._id);
          return res.status(HTTP_STATUS.OK).send(success("Incremented product to cart"));
        } else {
          console.log("User doesn't have a cart");
          const newCart = new Cart({ userId: req.body.userId, itemList: [], total: 0 });
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

  async removeProductFromCart(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(HTTP_STATUS.NOT_ACCEPTABLE)
          .send(failure("Invalid inputs", errors.array()));
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

  async deleteCart(req, res, next) {
    try {
      //
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new cartController();
