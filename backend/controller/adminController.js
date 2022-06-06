const Product = require("../model/product");
const { success, failure } = require("../utils/commonResponse");
const HTTP_STATUS = require("../utils/httpStatus");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

class productController {
  async addProduct(req, res, next) {
    try {
      const errors = validationResult(req);
      console.log(req.file);
      if (!req.file) {
        errors.errors.push({
          param: "productImage",
          msg: "Product Image is required. Only jpeg, jpg and png file is allowed!",
        });
      }
      if (!errors.isEmpty()) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("Invalid inputs", errors.array()));
      }
      console.log("image", req.file);
      const product = new Product({
        name: req.body.name,
        price: parseInt(req.body.price),
        weight: req.body.weight,
        image: "files/" + req.file.filename,
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
  }

  async editProduct(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!req.file) {
        errors.errors.push({
          param: "productImage",
          msg: "Product Image is required. Only jpeg, jpg and png file is allowed!",
        });
      }
      if (!errors.isEmpty()) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("Invalid inputs", errors.array()));
      }
      const target = await Product.findById(req.body.productId);
      console.log(target);
      const updateData = {
        name: req.body.name,
        price: parseInt(req.body.price),
        weight: req.body.weight,
        image: req.body.image,
        description: req.body.description,
        type: req.body.type,
      };
      if (req.file) {
        fs.unlink(path.join(__dirname, "..", target.image), function () {
          console.log("Deleted existing image link");
        });
      }
      updateData.image = "files/" + req.file.filename;

      const result = await Product.findOneAndUpdate({ _id: req.body.productId }, updateData, {
        new: false,
      }).exec();
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
  }

  async deleteProduct(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("Invalid inputs", errors.array()));
      }
      const result = await Product.findByIdAndDelete(req.body.productId).exec();
      if (!result) {
        return res.status(HTTP_STATUS.OK).send(failure({ message: "Product id does not exist!" }));
      }
      return res.status(HTTP_STATUS.OK).send(success({ message: "Deleted product successully!" }));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new productController();
