import { NextFunction, Request, Response } from "express";
import { IProduct } from "types/database";
import { Product } from "../model/product";
const { success, failure } = require("../utils/commonResponse");
import { HTTP_STATUS } from "../utils/httpStatus";
const { validationResult } = require("express-validator");
const getPagination = require("../utils/pagination");

class productController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page: string | number = req.query.page as string ? req.query.page as string : 0;
      const itemsPerPage: string | number = req.query.limit as string ? req.query.limit as string : 0;
      const { skip, limit } = getPagination(page, itemsPerPage);

      let products: IProduct[];
      let total: number;

      // If no page or limit is provided, return all data
      // if (page === null || limit === null) {
      //   products = await Product.find().exec();
      //   total = await Product.count().exec();
      // } else if (page >= 0 && limit >= 0) {
      products = await Product.find().skip(skip).limit(limit).exec();
      total = await Product.count().exec();
      // }
      console.log(products);
      if (products.length > 0) {
        return res
          .status(HTTP_STATUS.OK)
          .send(success("All products received", { products, total }));
      } else {
        return res.status(HTTP_STATUS.NOT_FOUND).send(failure("No products found"));
      }

      // Otherwise, return the paginated data
      if (products.length > 0) {
        return res
          .status(HTTP_STATUS.OK)
          .send(success("All products received", { products, total }));
      } else {
        return res.status(HTTP_STATUS.NOT_FOUND).send(success("No products found", products));
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
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

  async searchProduct(req: Request, res: Response, next: NextFunction) {
    try {
      //
      // console.log(req.params.searchParams);
      const category = req.params.category;
      const searchParams = req.params.searchParams;
      const searchQuery = {
        [category]: { $regex: searchParams },
      };
      // console.log(searchQuery);
      const product = await Product.find(searchQuery).limit(100).exec();
      if (!product.length) {
        return res.status(HTTP_STATUS.NOT_FOUND).send(failure("No result"));
        console.log(product);
      }
      return res.status(HTTP_STATUS.OK).send(success("Successfully retrieved products", product));
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new productController();
