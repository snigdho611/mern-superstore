const Product = require("../model/product");
const { success, failure } = require("../utils/commonResponse");
const HTTP_STATUS = require("../utils/httpStatus");
const { validationResult } = require("express-validator");

class productController {
  async getAll(req, res, next) {
    try {
      const products = await Product.find().exec();
      if (products.length > 0) {
        return res.status(HTTP_STATUS.OK).send(success("All products received", products));
      } else {
        return res.status(HTTP_STATUS.NOT_FOUND).send(success("No products found", products));
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async addProduct(req, res, next) {
    //
    if (req.body) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure(errors.array()));
      }
      console.log(req.body);
      return res.status(HTTP_STATUS.OK).send({ message: req.body });
    }
  }
}

module.exports = new productController();
