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
        return res.status(HTTP_STATUS.NOT_ACCEPTABLE).send(failure("Failed to get cart.", errors));
      }
      const cart = await Cart.findOne({ userId: req.body.userId })
        .exec()
        .exec()
        .populate({ path: "itemList.productId", select: "-_id" })
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
      //
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(HTTP_STATUS.NOT_ACCEPTABLE).send(failure("Failed to get cart.", errors));
      }

      const result = await Cart.findOne({ userId: req.body.userId }).exec();
      if (result) {
        console.log(result);
        return res.status(HTTP_STATUS.OK).send(success("Got cart successfully.", result));
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async removeProduct(req, res, next) {
    try {
      //
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
