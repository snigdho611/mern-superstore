import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import { failure } from "../utils/commonResponse";
import { HTTP_STATUS } from "../utils/httpStatus";


export const checkAuth = (req: any, res: Response, next: NextFunction) => {
  if (req.get("authorization")) {
    // const token = req.headers.authorization.split(' ')[1];
    const authToken = req.get("authorization");
    const token = authToken && authToken.split(" ")[1];
    try {
      const decodedData: any = jwt.verify(token as string, process.env.JWT_SECRET_KEY as string);
      req.user = {
        _id: decodedData._id,
        firstName: decodedData.firstName,
        lastName: decodedData.lastName,
        email: decodedData.email,
        isAdmin: decodedData.isAdmin,
      };
      next();
    } catch (error: any) {
      console.log(error);
      return res.status(HTTP_STATUS.FORBIDDEN).send(failure({ message: error.message }));
    }
  } else {
    return res.status(HTTP_STATUS.UNAUTHORIZED).send(failure({ message: "Request is not authorized" }));
  }
};

export const isAdmin = (req: any, res: Response, next: NextFunction) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return res.status(HTTP_STATUS.FORBIDDEN).send(failure({ message: "Access is restricted" }));
  }
};
