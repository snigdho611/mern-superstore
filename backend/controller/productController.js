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

  async getOne(req, res, next) {
    try {
      const product = await Product.findById(req.params.productId).exec();
      if (product) {
        return res.status(HTTP_STATUS.OK).send(success("All products received", product));
      } else {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .send(success("No product found with this id", product));
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new productController();
