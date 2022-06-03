const Product = require("../model/product");
const { success, failure } = require("../utils/commonResponse");
const HTTP_STATUS = require("../utils/httpStatus");
const { validationResult } = require("express-validator");

class productController {
  async getAll(req, res, next) {
    try {
      const products = await Product.find().exec();
      return res.status(HTTP_STATUS.OK).send(success("All products received", products));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new productController();
