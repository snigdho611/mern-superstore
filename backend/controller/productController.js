const Product = require("../model/product");
const { success, failure } = require("../utils/commonResponse");
const HTTP_STATUS = require("../utils/httpStatus");
const { validationResult } = require("express-validator");
const getPagination = require("../utils/pagination");

class productController {
  async getAll(req, res, next) {
    try {
      const page = req.query.page ? req.query.page : 0;
      const itemsPerPage = req.query.limit ? req.query.limit : 0;
      const { skip, limit } = getPagination(page, itemsPerPage);

      let products;
      let total;

      // If no page or limit is provided, return all data
      // if (page === null || limit === null) {
      //   products = await Product.find().exec();
      //   total = await Product.count().exec();
      // } else if (page >= 0 && limit >= 0) {
      products = await Product.find().skip(skip).limit(limit).exec();
      total = await Product.count().exec();
      // }

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

  async searchProduct(req, res, next) {
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
