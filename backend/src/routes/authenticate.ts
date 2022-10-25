import express from "express";
import AuthenticateController from "../controller/authentincateController";
// const authenticateController = require("../controller/authentincateController");
const validator = require("../middleware/validation");
const router = express.Router();

router.post("/login", validator.login, AuthenticateController.login);

router.post("/signup", validator.signup, AuthenticateController.signup);

router.get(
  "/email-verify/:token/:userId",
  validator.emailVerify,
  AuthenticateController.emailVerify
);

router.post(
  "/reset-password-email",
  validator.resetPasswordEmail,
  AuthenticateController.requestResetPasswordEmail
);

router.post("/reset-password", validator.resetPassword, AuthenticateController.resetPassword);

// router.get("/test", (req, res, next) => {
//   res.render("ResetPassword", {
//     pageTitle: "Add Product",
//     path: "/admin/add-product",
//     editing: false,
//     name: "ABC",
//     resetUrl: "123",
//   });
// });

module.exports = router;
