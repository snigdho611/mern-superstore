const { validationResult } = require("express-validator");
const Login = require("../model/login");
const User = require("../model/user");
const { success, failure } = require("../utils/commonResponse");
const crypto = require("crypto");
const path = require("path");
const HTTP_STATUS = require("../utils/httpStatus");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const sendMail = require("../config/mail");
const { promisify } = require("util");
const ejsRenderFile = promisify(ejs.renderFile);

class authenticateController {
  async login(req, res, next) {
    try {
      const validatorResult = validationResult(req);
      if (!validatorResult.isEmpty()) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("Invalid Inputs", validatorResult.array()));
      }

      const login = await Login.findOne({ email: req.body.email }).exec();
      if (!login) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).send(failure("User login is not authorized"));
      }
      const passMatch = await bcrypt.compare(req.body.password, login.password);

      if (!passMatch) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).send(failure("User login is not authorized"));
      }

      const userData = {
        _id: login._id,
        email: login.email,
        isAdmin: login.isAdmin,
        isEmailVerified: login.isEmailVerified,
      };
      const jwtToken = jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
      const resData = {
        access_token: jwtToken,
        ...userData,
      };

      return res.status(HTTP_STATUS.OK).send(success("Signed in successfully!", resData));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async signup(req, res, nex) {
    try {
      const validatorResult = validationResult(req);
      if (!validatorResult.isEmpty()) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("Invalid inputs", validatorResult.array()));
      }
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const phone = req.body.phone;
      const user = new User({ firstName: firstName, lastName: lastName, phone: phone });
      await user.save();

      const email = req.body.email;
      const password = await bcrypt.hash(req.body.password, 10);
      const login = new Login({ email: email, password: password, userId: user._id });

      const jwtToken = jwt.sign(
        {
          _id: login._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: login.email,
          isAdmin: login.isAdmin,
          isEmailVerified: login.isEmailVerified,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );

      const resData = {
        token: jwtToken,
        userId: login.userId,
        _id: login._id,
      };

      const verifyToken = crypto.randomBytes(32).toString("hex");
      login.emailToken = verifyToken;
      login.emailTokenExpire = Date.now() + 60 * 60 * 1000;
      await login.save();
      console.log(process.env.FRONTEND_BASE_URI, "email-verify", verifyToken, login._id.toString());
      const emailVerifyUrl = path.join(
        process.env.BACKEND_BASE_URI,
        "email-verify",
        verifyToken,
        login._id.toString()
      );

      const htmlStr = await ejsRenderFile(path.join(__dirname, "..", "mails", "VerifyMail.ejs"), {
        name: user.firstName + " " + user.lastName,
        emailUrl: emailVerifyUrl,
      });

      sendMail({
        from: "ABC Store <mail@abcstore.com>",
        to: login.email,
        subject: "Verify your email",
        html: htmlStr,
      });

      return res
        .status(HTTP_STATUS.OK)
        .send(success("Successully signed up, please check your email.", resData));
    } catch (error) {
      console.log(error);
    }
  }

  async emailVerify(req, res, next) {
    try {
      const validatorResult = validationResult(req);
      if (!validatorResult.isEmpty()) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("Invalid inputs", validatorResult.array()));
      }
      const login = await Login.findOne({
        emailToken: req.params.token,
        _id: req.params.userId,
      });
      if (!login) {
        // User not found
        return res.redirect(process.env.FRONTEND_BASE_URI + "/email-verify?status=1");
      }
      if (login.isEmailVerified === true) {
        // Mail already validated
        return res.redirect(process.env.FRONTEND_BASE_URI + "/email-verify?status=2");
      }
      if (login.emailTokenExpire < Date.now()) {
        // Mail token expired
        return res.redirect(process.env.FRONTEND_BASE_URI + "/email-verify?status=3");
      }
      login.emailToken = null;
      login.emailTokenExpire = null;
      login.isEmailVerified = true;
      login.save();
      res.status(HTTP_STATUS.OK);
      return res.redirect(process.env.FRONTEND_BASE_URI + "/email-verify?status=4");
    } catch (error) {
      console.log(error);
      return res.redirect(process.env.FRONTEND_BASE_URI + "/email-verify?status=5");
    }
  }
  async requestResetPasswordEmail(req, res, next) {
    try {
      const validatorResult = validationResult(req);
      if (!validatorResult.isEmpty()) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("Invalid inputs", validatorResult.array()));
      }
      const login = await Login.findOne({ email: req.body.email })
        .populate("userId")
        .select("email passwordResetToken passwordResetExpire userId");
      if (!login) {
        return res.status(HTTP_STATUS.NOT_FOUND).send(failure("No email found for a user"));
      }
      const token = crypto.randomBytes(32).toString("hex");
      login.passwordResetToken = token;
      login.passwordResetExpire = Date.now() + 60 * 60 * 1000;
      await login.save();
      console.log(login);

      const resetPasswordURL = path.join(
        process.env.FRONTEND_BASE_URI,
        "reset-password",
        token,
        login._id.toString()
      );
      const htmlStr = await ejsRenderFile(
        path.join(__dirname, "..", "mails", "ResetPassword.ejs"),
        {
          name: login.userId.firstName + " " + login.userId.lastName,
          resetUrl: resetPasswordURL,
        }
      );

      sendMail({
        from: "ABC Store <abc@store.com>",
        to: req.body.email,
        subject: "Password Reset Request",
        html: htmlStr,
      });
      return res
        .status(HTTP_STATUS.OK)
        .send(success("Successully requested for password, please check your email."));
    } catch (error) {
      console.log(error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const validatorResult = validationResult(req);
      if (!validatorResult.isEmpty()) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("Invalid inputs", validatorResult.array()));
      }
      // console.log(req.body);
      const newPassword = req.body.password;
      const newPasswordConfirm = req.body.confirmPassword;
      const login = await Login.findById({ _id: req.body.userId }).populate("userId");
      const passMatch = await bcrypt.compare(newPassword, login.password);
      if (passMatch) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("New password cannot be same as old password"));
      }
      if (login.passwordResetExpire < Date.now()) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure("Link expired"));
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // console.log(hashedPassword);
      login.password = hashedPassword;
      login.passwordResetToken = null;
      login.passwordResetExpire = null;
      await login.save();
      return res
        .status(HTTP_STATUS.OK)
        .send(success("Successully updated password, please log in"));
    } catch (error) {
      console.log(error);
    }
    //
  }
}

module.exports = new authenticateController();
