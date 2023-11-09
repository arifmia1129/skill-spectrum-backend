import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Filter,
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { CourseSearchableField } from "./course.constant";
import { ICourse } from "./course.interface";
import Course from "./course.model";

const createCourseService = async (
  courseInfo: ICourse,
): Promise<ICourse | null> => {
  const res = await Course.create(courseInfo);
  return res;
};

const getCourseService = async (
  filters: Filter,
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<ICourse[]>> => {
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
      $or: CourseSearchableField.map(field => ({
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

  const res = await Course.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Course.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

const getCourseByIdService = async (id: string): Promise<ICourse | null> => {
  const res = await Course.findById(id).populate("prerequisites");
  return res;
};

const updateCourseByIdService = async (
  id: string,
  payload: Partial<ICourse>,
): Promise<ICourse | null> => {
  const res = await Course.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return res;
};

const deleteCourseByIdService = async (id: string): Promise<ICourse | null> => {
  const res = await Course.findByIdAndDelete(id);
  return res;
};

export const CourseService = {
  create: createCourseService,
  getAll: getCourseService,
  getById: getCourseByIdService,
  update: updateCourseByIdService,
  delete: deleteCourseByIdService,
};
