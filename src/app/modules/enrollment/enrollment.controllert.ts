import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  Pagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { paginationField } from "../../constant/pagination";
import { EnrollmentService } from "./enrollment.service";
import { IEnrollment } from "./enrollment.interface";
import httpStatus from "../../../shared/httpStatus";
import { EnrollmentFilterableField } from "./enrollment.constant";

const createEnrollment = catchAsync(async (req: Request, res: Response) => {
  const result: IEnrollment | null = await EnrollmentService.create(req.body);

  sendResponse<IEnrollment>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully created Enrollment",
    data: result,
  });
});

const getEnrollment = catchAsync(async (req: Request, res: Response) => {
  const filterData: Filter = pick(req.query, EnrollmentFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await EnrollmentService.getAll(filterData, paginationOptions);

  sendResponse<IEnrollment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved all Enrollments",
    meta: result.meta,
    data: result.data,
  });
});

const getEnrollmentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EnrollmentService.getById(id);
  sendResponse<IEnrollment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved Enrollment by id",
    data: result,
  });
});

const updateEnrollmentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EnrollmentService.update(id, req.body);
  sendResponse<IEnrollment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated Enrollment",
    data: result,
  });
});

const deleteEnrollmentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EnrollmentService.delete(id);
  sendResponse<IEnrollment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully deleted Enrollment",
    data: result,
  });
});

export const EnrollmentController = {
  create: createEnrollment,
  getAll: getEnrollment,
  getById: getEnrollmentById,
  update: updateEnrollmentById,
  delete: deleteEnrollmentById,
};
