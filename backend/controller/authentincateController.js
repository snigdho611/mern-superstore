const { validationResult } = require("express-validator");
const Login = require("../model/login");
const { success, failure } = require("../utils/commonResponse");
const HTTP_STATUS = require("../utils/httpStatus");

class authenticateController {
  async login(req, res, next) {
    // console.log("Log in");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
        .send(failure(failure("Invalid inputs", errors.array())));
    }
    const result = await Login.findOne({
      email: req.body.email.toString(),
      password: req.body.password.toString(),
    })
      .select("email _id type userId")
      .populate("userId")
      .exec();
    if (result) {
      console.log(result);
      console.log("Successfully logged in, user: " + result?.email);
      return res.status(HTTP_STATUS.OK).send(success("Successfully logged in", result));
    }
    console.log("Invalid user credentials");
    return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure("Invalid credentials"));
  }
}

module.exports = new authenticateController();
