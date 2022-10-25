import { Request, Response, NextFunction } from "express";
import { ILogin, IUser } from "types/database";

const { validationResult } = require("express-validator");
// const Login = require("../model/login");
import { Login } from "../model/login";
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
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validatorResult = validationResult(req);
      if (!validatorResult.isEmpty()) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("Invalid Inputs", validatorResult.array()));
      }

      const login: ILogin | null = await Login.findOne({ email: req.body.email }).populate("userId").exec();
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
        firstName: (login.userId as IUser).firstName,
        userId: (login.userId as IUser)._id,
        lastName: (login.userId as IUser).lastName,
      };
      console.log(login);
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

  async signup(req: Request, res: Response, next: NextFunction) {
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
      const user: IUser = new User({ firstName: firstName, lastName: lastName, phone: phone });
      await user.save();

      const email: string = req.body.email;
      const password: string = await bcrypt.hash(req.body.password, 10);
      const login: ILogin = new Login({ email: email, password: password, userId: user._id });

      const jwtToken = jwt.sign(
        {
          _id: login._id,
          firstName: firstName,
          lastName: lastName,
          email: login.email,
          isAdmin: login.isAdmin,
          isEmailVerified: login.isEmailVerified,
          userId: login.userId,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );

      const resData = {
        token: jwtToken,
        userId: login.userId,
        isAdmin: login.isAdmin,
        isEmailVerified: login.isEmailVerified,
        firstName: (login.userId as IUser).firstName,
        lastName: (login.userId as IUser).lastName,
        _id: login._id,
      };

      const verifyToken = crypto.randomBytes(32).toString("hex");
      login.emailToken = verifyToken;
      login.emailTokenExpire = new Date(Date.now() + 60 * 60 * 1000);
      await login.save();
      console.log(process.env.FRONTEND_BASE_URI, "email-verify", verifyToken, login._id.toString());
      const emailVerifyUrl = path.join(
        process.env.BACKEND_BASE_URI,
        "auth",
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

  async emailVerify(req: Request, res: Response, next: NextFunction) {
    try {
      const validatorResult = validationResult(req);
      if (!validatorResult.isEmpty()) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("Invalid inputs", validatorResult.array()));
      }
      const login: ILogin | null = await Login.findOne({
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
      if (login.emailTokenExpire && login.emailTokenExpire < new Date(Date.now())) {
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
  async requestResetPasswordEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const validatorResult = validationResult(req);
      if (!validatorResult.isEmpty()) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("Invalid inputs", validatorResult.array()));
      }
      const login: ILogin | null = await Login.findOne({ email: req.body.email })
        .populate("userId")
        .select("email passwordResetToken passwordResetExpire userId");
      if (!login) {
        return res.status(HTTP_STATUS.NOT_FOUND).send(failure("No email found for a user"));
      }
      const token = crypto.randomBytes(32).toString("hex");
      login.passwordResetToken = token;
      login.passwordResetExpire = new Date(Date.now() + 60 * 60 * 1000);
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
          name: (login.userId as IUser).firstName + " " + (login.userId as IUser).lastName,
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

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const validatorResult = validationResult(req);
      if (!validatorResult.isEmpty()) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("Invalid inputs", validatorResult.array()));
      }
      // console.log(req.body);
      const newPassword = req.body.password;
      const login: ILogin | null = await Login.findById({ _id: req.body.userId }).populate("userId");
      if (!login) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("User not found."));
      }
      const passMatch = await bcrypt.compare(newPassword, login.password);
      if (login.passwordResetToken === null) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("Link is not available anymore."));
      }
      if (login.passwordResetExpire && login.passwordResetExpire < new Date(Date.now())) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure("Link expired"));
      }
      if (passMatch) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("New password cannot be same as old password"));
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

const AuthenticateController = new authenticateController();
export default AuthenticateController;