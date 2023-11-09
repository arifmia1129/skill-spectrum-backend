import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import { UserService } from "./user.service";
import httpStatus from "../../../shared/httpStatus";
import { JwtPayload } from "jsonwebtoken";

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userInfo } = req.body;

  const result = await UserService.createStudent(student, userInfo);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully created student",
    data: result,
  });
});
const getProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;

  const result = await UserService.getProfile(user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully get profile",
    data: result,
  });
});

export const UserController = {
  createStudent,
  getProfile,
};
