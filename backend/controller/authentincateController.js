const { validationResult } = require("express-validator");
const Login = require("../model/login");
const User = require("../model/users");
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
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("Invalid Inputs", errors.array()));
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
      };
      // console.log(userData);
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
        .send(failure("Invalid inputs", errors.array()));
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
      process.env.FRONTEND_BASE_URI,
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
  }

  async emailVerify(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("Invalid inputs", errors.array()));
      }
      const login = await Login.findOne({
        emailToken: req.body.token,
        _id: req.body.userId,
      });
      if (!login) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .send(failure("User not found", { validation: "Error: user not found" }));
      }
      if (
        login.emailTokenExpire === null ||
        login.isEmailVerified === true ||
        login.emailToken === null
      ) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .send(failure("Email is already validated", { validation: "Already verified" }));
      }
      if (login.emailTokenExpire < Date.now()) {
        return res
          .status(HTTP_STATUS.GONE)
          .send(failure("This link has expired", { validation: "Error: link expired" }));
      }
      login.emailToken = null;
      login.emailTokenExpire = null;
      login.isEmailVerified = true;
      login.save();
      return res
        .status(HTTP_STATUS.OK)
        .send(success("Successfully validated email", { validation: "Validated" }));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new authenticateController();
