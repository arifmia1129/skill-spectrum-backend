import { HydratedDocument, Model, Types } from "mongoose";

export type ICourse = {
  name: string;
  instructor: string;
  description: string;
  enrollmentStatus: "open" | "closed" | "in-progress";
  thumbnail: string;
  duration: string;
  schedule: string;
  location: string;
  prerequisites: Types.ObjectId[];
  syllabus: { week: number; topic: string; content: string }[];
};

export type ICourseMethods = {
  fullName(): string;
};

export type CourseModel = {
  createWithFullName(): Promise<HydratedDocument<ICourse, ICourseMethods>>;
  // name: string,
} & Model<ICourse, object, ICourseMethods>;
