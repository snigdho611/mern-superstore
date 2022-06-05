const Product = require("../model/product");
const { success, failure } = require("../utils/commonResponse");
const HTTP_STATUS = require("../utils/httpStatus");
const { validationResult } = require("express-validator");

class productController {
  addProduct = async (req, res, next) => {
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
      await product.save((err, result) => {
        if (err) {
          console.log("Failed to add product");
          return res.status(HTTP_STATUS.OK).send(failure({ message: "Failed to add product" }));
        }
        console.log("Successfully added product");
        return res
          .status(HTTP_STATUS.OK)
          .send(success({ message: "Successfully added product" }, result));
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  editProduct = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure(errors.array()));
      }
      //   console.log(req.body.productId);
      const result = await Product.findOneAndUpdate(
        { _id: req.body.productId },
        {
          name: req.body.name,
          price: parseInt(req.body.price),
          weight: req.body.weight,
          image: req.body.image,
          description: req.body.description,
          type: req.body.type,
        },
        { new: false }
      );
      //   console.log(result);
      if (result) {
        return res
          .status(HTTP_STATUS.OK)
          .send(success({ message: "Updated product successully!" }, result));
      } else {
        return res.status(HTTP_STATUS.OK).send(failure({ message: "Product update failed!" }));
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure(errors.array()));
      }
      const result = await Product.findByIdAndDelete(req.body.productId);
      if (!result) {
        return res.status(HTTP_STATUS.OK).send(failure({ message: "Product id does not exist!" }));
      }
      return res.status(HTTP_STATUS.OK).send(success({ message: "Deleted product successully!" }));
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

module.exports = new productController();
