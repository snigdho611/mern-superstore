const { body } = require("express-validator");

const validator = {
  addProduct: [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("weight").notEmpty().withMessage("Weight is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("image").notEmpty().withMessage("Image is required"),
    body("price").notEmpty().withMessage("Price is required"),
  ],
  updateProduct: [
    body("productId").notEmpty().withMessage("Product Id required"),
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("weight").notEmpty().withMessage("Weight is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("image").notEmpty().withMessage("Image is required"),
    body("price").notEmpty().withMessage("Price is required"),
  ],
  deleteProduct: [body("productId").notEmpty().withMessage("Product Id required")],
  login: [
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  getCart: [body("userId").notEmpty().withMessage("User ID is required")],
  addToCart: [
    body("userId").notEmpty().withMessage("User ID is required"),
    body("productId").notEmpty().withMessage("Product ID is required"),
  ],
  removeProduct: [
    body("userId").notEmpty().withMessage("User ID is required"),
    body("productId").notEmpty().withMessage("Product ID is required"),
  ],
};

module.exports = validator;
