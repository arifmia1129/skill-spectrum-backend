import { HydratedDocument, Model } from "mongoose";

export type Name = {
  firstName: string;
  middleName?: string;
  lastName?: string;
};

export type IStudent = {
  id: string;
  name: Name;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  address: string;
  bloodGroup?: "a+" | "a-" | "b+" | "b-" | "ab+" | "ab-" | "o+" | "o-";
  profileImage?: string;
};

export type IStudentMethods = {
  fullName(): string;
};

export type StudentModel = {
  createWithFullName(): Promise<HydratedDocument<IStudent, IStudentMethods>>;
  // name: string,
} & Model<IStudent, object, IStudentMethods>;
