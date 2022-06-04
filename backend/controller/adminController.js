const Product = require("../model/product");
const { success, failure } = require("../utils/commonResponse");
const HTTP_STATUS = require("../utils/httpStatus");
const { validationResult } = require("express-validator");

class productController {
  async addProduct(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure(errors.array()));
      }
      const product = new Product({
        name: req.body.name,
        price: parseInt(req.body.price),
        weight: req.body.weight,
        image: req.body.image,
        description: req.body.description,
        type: req.body.type,
      });
      product.save((error, results) => {
        console.log("Added product successfully");
        console.log(results);
      });
      return res
        .status(HTTP_STATUS.OK)
        .send(success({ message: "Successfully added data" }, product));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new productController();
