import { NextFunction, Request, Response } from "express";

const signupService = require("../../service/authentication");
import httpStatus from "http-status"; 

module.exports = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, fullName, phone } = req.body as {
      email: string;
      password: string;
      fullName: string;
      phone: string;
    };
    const newUser = await signupService.signup(
      email,
      phone,
      password,
      fullName,
    );
    return res
      .status(httpStatus.CREATED)
      .json({ message: "User created successfully", newUser });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
