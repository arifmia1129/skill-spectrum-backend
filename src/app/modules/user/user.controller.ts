import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import { UserService } from "./user.service";
import httpStatus from "../../../shared/httpStatus";

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

export const UserController = {
  createStudent,
};
