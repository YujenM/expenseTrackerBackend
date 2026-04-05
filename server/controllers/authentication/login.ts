import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status"; 
const loginservice = require("../../service/authentication");

module.exports = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const response = await loginservice.login(email, password);
    res.status(httpStatus.OK).json({ message: "Login successful", response });
  } catch (error: any) {
    next(error);
  }
};
