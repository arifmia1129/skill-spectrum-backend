import { Schema, model } from "mongoose";
import { IStudent, IStudentMethods, StudentModel } from "./student.interface";
import { bloodGroupEnum, genderEnum } from "./student.constant";

export const studentSchema = new Schema<
  IStudent,
  StudentModel,
  IStudentMethods
>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string): boolean {
          return value.length === 9;
        },
        message: "ID must be 9 character",
      },
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      middleName: { type: String },
      lastName: {
        type: String,
      },
    },
    gender: {
      type: String,
      required: true,
      enum: genderEnum,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
      unique: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
      lowercase: true,
      enum: bloodGroupEnum,
    },
    profileImage: {
      type: String,
      default: "https://images.unsplash.com/photo-1586213411132-adf8a78b221f",
    },
  },
  {
    timestamps: true,
  },
);

const Student = model<IStudent, StudentModel>("Student", studentSchema);

export default Student;
