import { HydratedDocument, Model, Types } from "mongoose";
import { ICourse } from "../course/course.interface";
import { IStudent } from "../student/student.interface";

export type IEnrollment = {
  courseId: Types.ObjectId | ICourse;
  studentId: Types.ObjectId | IStudent;
  status: "enrolled" | "completed";
  progress: number;
};

export type IEnrollmentMethods = {
  fullName(): string;
};

export type EnrollmentModel = {
  createWithFullName(): Promise<
    HydratedDocument<IEnrollment, IEnrollmentMethods>
  >;
  // name: string,
} & Model<IEnrollment, object, IEnrollmentMethods>;
