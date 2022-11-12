import { NextFunction, Request, Response } from "express";
import { IProduct, MulterRequest } from "types/database";
import { Product } from "../model/product";
import { success, failure } from "../utils/commonResponse";
import { HTTP_STATUS } from "../utils/httpStatus";
import { Result, ValidationError, validationResult } from "express-validator";
// import fs from "fs/promises";
import { promises as fsPromises } from 'fs';
import path from "path";
import Cart from "../model/cart";

class adminController {
  async addProduct(req: MulterRequest, res: Response, next: NextFunction) {
    try {
      const validatorResult: Result<ValidationError> = validationResult(req);
      if (!req.file) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure({ message: "Product Image is required.Only jpeg, jpg and png file is allowed!" }));
      }
      if (!validatorResult.isEmpty()) {
        if (req.file) {
          await fsPromises.unlink(path.join(__dirname, "../files/products", req.file.filename));
          console.log({ error: "File was deleted due to other validation errors" });
        }
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure({ message: "Invalid inputs", error: validatorResult.array() }));
      }
      const product: IProduct = new Product({
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
          .send(success({ message: "Successfully added product" }));
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const validatorResult = validationResult(req);
      if (!validatorResult.isEmpty()) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure({ message: "Invalid inputs", error: validatorResult.array() }));
      }
      const dataToUpdate = {
        ...req.body,
      };
      if (Object.keys(dataToUpdate).length === 1) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure({ message: "No data sent to update" }));
      }
      const product = await Product.findOneAndUpdate({ _id: req.body.productId }, dataToUpdate, {
        new: true,
      }).exec();
      if (product) {
        return res
          .status(HTTP_STATUS.OK)
          .send(success({ message: "Updated product successully!" }));
      } else {
        return res.status(HTTP_STATUS.OK).send(failure({ message: "Product update failed!" }));
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateImage(req: MulterRequest, res: Response, next: NextFunction) {
    try {
      const validatorResult = validationResult(req);
      if (!req.file) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure({ message: "Product Image is required.Only jpeg, jpg and png file is allowed!" }));
      }
      console.log("Image format: ok");
      if (!validatorResult.isEmpty()) {
        if (req.file) {
          await fsPromises.unlink(path.join(__dirname, "../files/products", req.file.filename));
          console.log({ error: "File was deleted due to other validation errors" });
        }
        console.log("File removed for request containing other errors");
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure({ message: "Invalid inputs", error: validatorResult.array() }));
      }
      const product: IProduct | null = await Product.findById(req.body.productId).exec();
      if (product) {
        try {
          await fsPromises.unlink(path.join(__dirname, "..", product.image));
        } catch (error) {
          console.log("Product original image seems unavailable, unable to delete it.");
        }
        product.image = `\\${req.file.path}`;
        product.save();
        return res
          .status(HTTP_STATUS.OK)
          .send(success({ message: "Updated image successully!" }));
      } else {
        await fsPromises.unlink(path.join(__dirname, "..", req.file.path));

        return res.status(HTTP_STATUS.OK).send(failure({ message: "Image update failed!" }));
      }
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const validatorResult = validationResult(req);
      if (!validatorResult.isEmpty()) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure({ message: "Invalid inputs", error: validatorResult.array() }));
      }
      const product = await Product.findByIdAndDelete(req.params.productId).exec();
      console.log(product);
      if (!product) {
        return res.status(HTTP_STATUS.OK).send(failure({ message: "Product id does not exist!" }));
      }
      await Cart.updateMany(
        {},
        { $pull: { itemList: { productId: req.params.productId } } }
      ).exec();
      return res.status(HTTP_STATUS.OK).send(success({ message: "Deleted product successully!" }));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
const AdminController = new adminController();
export default AdminController;
