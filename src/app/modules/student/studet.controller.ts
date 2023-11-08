import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  Pagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { paginationField } from "../../constant/pagination";
import { IStudent } from "./student.interface";
import { StudentService } from "./student.service";
import { StudentFilterableField } from "./student.constant";

const getStudent = catchAsync(async (req: Request, res: Response) => {
  const filterData: Filter = pick(req.query, StudentFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await StudentService.getStudent(filterData, paginationOptions);

  sendResponse<IStudent[]>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved all student",
    meta: result.meta,
    data: result.data,
  });
});

const getStudentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentService.getStudentById(id);
  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved student by id",
    data: result,
  });
});

const updateStudentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await StudentService.updateStudentById(id, req.body);
  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully updated student",
    data: result,
  });
});

const deleteStudentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentService.deleteStudentById(id);
  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully deleted student",
    data: result,
  });
});

export const StudentController = {
  getStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
};
