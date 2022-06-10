const { body } = require("express-validator");
const Login = require("../model/login");

const validator = {
  addProduct: [
    body("name")
      .notEmpty()
      .withMessage("Product name is required")
      .isLength({ min: 8 })
      .withMessage("Product name must be of minimum 8 characters"),
    body("description")
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ min: 15 })
      .withMessage("Product description must be of minimum 15 characters"),
    body("weight").notEmpty().withMessage("Weight is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("price")
      .notEmpty()
      .withMessage("Price is required")
      .isNumeric()
      .withMessage("Price must be a number"),
  ],
  updateProduct: [
    body("productId")
      .notEmpty()
      .withMessage("Product Id is required")
      .isLength({ min: 24 })
      .withMessage("Product Id format invalid"),
    body("name")
      .if(body("name").notEmpty())
      .isLength({ min: 8 })
      .withMessage("Product name must be of minimum 8 characters"),
    body("description")
      .if(body("description").notEmpty())
      .isLength({ min: 15 })
      .withMessage("Product description must be of minimum 15 characters"),
    body("price")
      // .exists({ checkNull: false, checkFalsy: false })
      .if(body("price").notEmpty())
      .isNumeric()
      .withMessage("Price must be a number"),
  ],
  updateImage: [
    body("productId")
      .notEmpty()
      .withMessage("Product Id is required")
      .if(body("productId").notEmpty())
      .isLength({ min: 24 })
      .withMessage("Product Id format invalid"),
  ],
  deleteProduct: [
    body("productId")
      .notEmpty()
      .withMessage("Product Id is required")
      .if(body("productId").notEmpty())
      .isLength({ min: 24 })
      .withMessage("Product Id format invalid"),
  ],
  imageUpdate: [
    body("productId")
      .notEmpty()
      .withMessage("Product Id is required")
      .isLength({ min: 24 })
      .withMessage("Product Id format invalid"),
  ],
  login: [
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  signup: [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Email format is incorrect")
      .custom(async (value) => {
        const user = await Login.findOne({ email: value }).exec();
        if (user) {
          return Promise.reject("Email already exists");
        }
        return true;
      }),
    body("phone").notEmpty().withMessage("Phone is required"),
    body("confirmPassword").notEmpty().withMessage("Confirm password is required"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .custom(async (value, { req }) => {
        if (!/[A-Z]/.test(value)) {
          return Promise.reject("Password must contain at least one capital letter");
        }
        if (!value.match(/[a-z]/)) {
          return Promise.reject("Password must contain at least one small letter");
        }
        if (!value.match(/[0-9]/)) {
          return Promise.reject("Password must contain at least one number");
        }
        if (
          req.body.confirmPassword &&
          req.body.confirmPassword !== "" &&
          value !== req.body.confirmPassword
        ) {
          return Promise.reject("Passwords do not match!");
        }
        return true;
      }),
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
  emailVerify: [
    body("userId").notEmpty().withMessage("User ID is required"),
    body("token").notEmpty().withMessage("Email token is required"),
  ],
};

module.exports = validator;
