const { validationResult } = require("express-validator");
const Login = require("../model/login");
const User = require("../model/users");
const { success, failure } = require("../utils/commonResponse");
const HTTP_STATUS = require("../utils/httpStatus");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res
    //     .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
    //     .send(failure(failure("Invalid inputs", errors.array())));
    // }
    // const result = await Login.findOne({
    //   email: req.body.email.toString(),
    //   password: req.body.password.toString(),
    // })
    //   .select("email _id type userId")
    //   .populate("userId")
    //   .exec();
    // if (result) {
    //   console.log(result);
    //   console.log("Successfully logged in, user: " + result?.email);
    //   return res.status(HTTP_STATUS.OK).send(success("Successfully logged in", result));
    // }
    // console.log("Invalid user credentials");
    // return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure("Invalid credentials"));
  }

  async signup(req, res, nex) {
    //
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
    await login.save();

    const jwtToken = jwt.sign(
      {
        _id: login._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: login.email,
        isAdmin: login.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    const resData = {
      token: jwtToken,
      ...login,
    };
    return res.status(HTTP_STATUS.OK).send(success("Successully authenticated!", resData.token));
  }

  async signin(req, res, next) {}
}

module.exports = new authenticateController();
