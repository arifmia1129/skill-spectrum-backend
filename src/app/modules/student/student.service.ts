/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Filter,
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";

import Student from "./student.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "../../../shared/httpStatus";
import User from "../user/user.model";
import { IStudent, Name } from "./student.interface";
import { StudentSearchableField } from "./student.constant";

const getStudent = async (
  filters: Filter,
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IStudent[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: StudentSearchableField.map(field => ({
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

  const res = await Student.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

const getStudentById = async (id: string): Promise<IStudent | null> => {
  const res = await Student.findById(id)
    .populate("academicSemester")
    .populate("academicDepartment")
    .populate("academicFaculty");
  return res;
};

const updateStudentById = async (
  id: string,
  payload: Partial<IStudent>,
): Promise<IStudent | null> => {
  const isExist = await Student.findById(id);

  if (!isExist) {
    throw new ApiError("Student not found by given id", httpStatus.NOT_FOUND);
  }

  const { name, ...studentInfo } = payload;

  const updateInfo: Partial<IStudent> = { ...studentInfo };

  //   name object
  if (name && Object.keys(name).length > 0) {
    const nameKeys = Object.keys(name);
    nameKeys.forEach(key => {
      const nameKey = `name.${key}`;
      (updateInfo as any)[nameKey] = name[key as keyof Name];
    });
  }

  const res = await Student.findOneAndUpdate({ _id: id }, updateInfo, {
    new: true,
  });

  return res;
};

const deleteStudentById = async (id: string): Promise<IStudent | null> => {
  const session = await mongoose.startSession();

  let res;

  try {
    session.startTransaction();
    const student = await Student.findOneAndDelete({ id });

    if (!student) {
      throw new ApiError(
        "Student delete operation is failed",
        httpStatus.BAD_REQUEST,
      );
    }

    res = student;

    const user = await User.deleteOne({ id });

    if (!user) {
      throw new ApiError(
        "User delete operation is failed",
        httpStatus.BAD_REQUEST,
      );
    }

    session.commitTransaction();
    session.endSession();
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }

  return res;
};

export const StudentService = {
  getStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
};
