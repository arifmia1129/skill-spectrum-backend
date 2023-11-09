import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Filter,
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { EnrollmentSearchableField } from "./enrollment.constant";
import { IEnrollment } from "./enrollment.interface";
import Enrollment from "./enrollment.model";
import Course from "../course/course.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "../../../shared/httpStatus";
import Student from "../student/student.model";

const createEnrollmentService = async (
  enrollmentInfo: IEnrollment,
): Promise<IEnrollment | null> => {
  const { courseId, studentId } = enrollmentInfo;

  const isCourseExist = await Course.findById(courseId);

  if (!isCourseExist) {
    throw new ApiError("Course not found", httpStatus.NOT_FOUND);
  }

  const isStudentExist = await Student.findById(studentId);

  if (!isStudentExist) {
    throw new ApiError("Student not found", httpStatus.NOT_FOUND);
  }

  const isAlreadyEnrolled = await Enrollment.findOne({
    courseId,
    studentId,
  });

  if (isAlreadyEnrolled) {
    throw new ApiError("Course already enrolled", httpStatus.BAD_REQUEST);
  }

  const res = await Enrollment.create(enrollmentInfo);
  return res;
};

const getEnrollmentService = async (
  filters: Filter,
  paginationOptions: Pagination,
  userId: string,
): Promise<ResponseWithPagination<IEnrollment[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const isStudentExist = await Student.findOne({ id: userId });

  if (!isStudentExist) {
    throw new ApiError("Student not found", httpStatus.NOT_FOUND);
  }

  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  andCondition.push({
    studentId: isStudentExist._id,
  });

  if (searchTerm) {
    andCondition.push({
      $or: EnrollmentSearchableField.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions = andCondition.length ? { $and: andCondition } : {};

  const res = await Enrollment.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Enrollment.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

const getEnrollmentByIdService = async (
  id: string,
): Promise<IEnrollment | null> => {
  const res = await Enrollment.findById(id);
  return res;
};

const updateEnrollmentByIdService = async (
  id: string,
  payload: Partial<IEnrollment>,
): Promise<IEnrollment | null> => {
  const { courseId, studentId } = payload;

  if (courseId) {
    const isCourseExist = await Course.findById(courseId);

    if (!isCourseExist) {
      throw new ApiError("Course not found", httpStatus.NOT_FOUND);
    }
  }

  if (studentId) {
    const isStudentExist = await Student.findById(studentId);

    if (!isStudentExist) {
      throw new ApiError("Student not found", httpStatus.NOT_FOUND);
    }
  }

  const res = await Enrollment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return res;
};

const deleteEnrollmentByIdService = async (
  id: string,
): Promise<IEnrollment | null> => {
  const res = await Enrollment.findByIdAndDelete(id);
  return res;
};

export const EnrollmentService = {
  create: createEnrollmentService,
  getAll: getEnrollmentService,
  getById: getEnrollmentByIdService,
  update: updateEnrollmentByIdService,
  delete: deleteEnrollmentByIdService,
};
