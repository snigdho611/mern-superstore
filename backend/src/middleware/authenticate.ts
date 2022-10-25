import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");
const { failure } = require("../utils/commonResponse");
const HTTP_STATUS = require("../utils/httpStatus");

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.get("authorization")) {
    // const token = req.headers.authorization.split(' ')[1];
    const token = req.get("authorization").split(" ")[1];
    try {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = {
        _id: decodedData._id,
        firstName: decodedData.firstName,
        lastName: decodedData.lastName,
        email: decodedData.email,
        isAdmin: decodedData.isAdmin,
      };
      //   console.log(req.user);
      next();
    } catch (error: any) {
      console.log(error);
      return res.status(HTTP_STATUS.FORBIDDEN).send(failure({ message: error.message }));
    }
  } else {
    return res.status(HTTP_STATUS.UNAUTHORIZED).send(failure("Request is not authorized"));
  }
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return res.status(HTTP_STATUS.FORBIDDEN).send(failure("Access is restricted"));
  }
};

// const isEmailVerified = (req: Request, res:Response, next:NextFunction) => {
//   if (req.user.isEmailVerified) {
//   }
// };

module.exports = {
  checkAuth,
  isAdmin,
};
