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
};

module.exports = validator;
