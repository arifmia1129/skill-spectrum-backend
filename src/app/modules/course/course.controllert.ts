import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  Pagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { paginationField } from "../../constant/pagination";
import { CourseService } from "./course.service";
import { ICourse } from "./course.interface";
import httpStatus from "../../../shared/httpStatus";
import { CourseFilterableField } from "./course.constant";

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result: ICourse | null = await CourseService.create(req.body);

  sendResponse<ICourse>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully created course",
    data: result,
  });
});

const getCourse = catchAsync(async (req: Request, res: Response) => {
  const filterData: Filter = pick(req.query, CourseFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await CourseService.getAll(filterData, paginationOptions);

  sendResponse<ICourse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved all courses",
    meta: result.meta,
    data: result.data,
  });
});

const getCourseById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseService.getById(id);
  sendResponse<ICourse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved course by id",
    data: result,
  });
});

const updateCourseById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseService.update(id, req.body);
  sendResponse<ICourse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated course",
    data: result,
  });
});

const deleteCourseById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseService.delete(id);
  sendResponse<ICourse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully deleted course",
    data: result,
  });
});

export const CourseController = {
  create: createCourse,
  getAll: getCourse,
  getById: getCourseById,
  update: updateCourseById,
  delete: deleteCourseById,
};
