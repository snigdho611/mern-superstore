const { application } = require("express");
const express = require("express");
const authenticateController = require("../controller/authentincateController");
const validator = require("../middleware/validation");
const router = express.Router();

router.post("/login", validator.login, authenticateController.login);

router.post("/signup", validator.signup, authenticateController.signup);

router.get(
  "/email-verify/:token/:userId",
  validator.emailVerify,
  authenticateController.emailVerify
);

router.post(
  "/reset-password-email",
  validator.resetPasswordEmail,
  authenticateController.requestResetPasswordEmail
);

router.post("/reset-password", validator.resetPassword, authenticateController.resetPassword);

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
