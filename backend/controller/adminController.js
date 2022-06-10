const Product = require("../model/product");
const { success, failure } = require("../utils/commonResponse");
const HTTP_STATUS = require("../utils/httpStatus");
const { validationResult } = require("express-validator");
const fs = require("fs/promises");
const path = require("path");

class adminController {
  async addProduct(req, res, next) {
    try {
      const validatorResult = validationResult(req);
      if (!req.file) {
        validatorResult.errors.push({
          param: "productImage",
          msg: "Product Image is required. Only jpeg, jpg and png file is allowed!",
        });
      }
      if (!validatorResult.isEmpty()) {
        if (req.file) {
          await fs.unlink(path.join(__dirname, "../files/products", req.file.filename));
          console.log({ error: "File was deleted due to other validation errors" });
        }
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("Invalid inputs", validatorResult.array()));
      }
      const product = new Product({
        name: req.body.name,
        price: parseInt(req.body.price),
        weight: req.body.weight,
        image: `\\${req.file.path}`,
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

  async updateProduct(req, res, next) {
    try {
      const validatorResult = validationResult(req);
      // if (!req.file) {
      //   validatorResult.errors.push({
      //     param: "productImage",
      //     msg: "Product Image is required. Only jpeg, jpg and png file is allowed!",
      //   });
      // }
      if (!validatorResult.isEmpty()) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("Invalid inputs", validatorResult.array()));
      }
      const dataToUpdate = {
        // name: req.body.name,
        // price: parseInt(req.body.price),
        // weight: req.body.weight,
        // description: req.body.description,
        // type: req.body.type,
        ...req.body,
      };
      // console.log(Object.keys(dataToUpdate).length);
      // return res.status(HTTP_STATUS.OK).send(success({ message: "Updated product successully!" }));
      if (Object.keys(dataToUpdate).length === 1) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure("No data sent to update"));
      }
      const product = await Product.findOneAndUpdate({ _id: req.body.productId }, dataToUpdate, {
        new: true,
      }).exec();
      if (product) {
        return res
          .status(HTTP_STATUS.OK)
          .send(success({ message: "Updated product successully!" }, product));
      } else {
        return res.status(HTTP_STATUS.OK).send(failure({ message: "Product update failed!" }));
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateImage(req, res, next) {
    try {
      const validatorResult = validationResult(req);
      if (!req.file) {
        validatorResult.errors.push({
          param: "productImage",
          msg: "Product Image is required. Only jpeg, jpg and png file is allowed!",
        });
      }
      console.log("Image format: ok");
      if (!validatorResult.isEmpty()) {
        if (req.file) {
          await fs.unlink(path.join(__dirname, "../files/products", req.file.filename));
          console.log({ error: "File was deleted due to other validation errors" });
        }
        console.log("File removed for request containing other errors");
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("Invalid inputs", validatorResult.array()));
      }
      const product = await Product.findOneAndUpdate(
        { _id: req.body.productId },
        { image: `\\${req.file.path}` }
      );
      if (product) {
        await fs.unlink(path.join(__dirname, "..", product.image));
        return res
          .status(HTTP_STATUS.OK)
          .send(success({ message: "Updated image successully!" }, product));
      } else {
        return res.status(HTTP_STATUS.OK).send(failure({ message: "Image update failed!" }));
      }
    } catch (error) {
      //
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

module.exports = new adminController();
