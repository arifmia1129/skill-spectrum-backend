import { Schema, model } from "mongoose";
import {
  IEnrollment,
  IEnrollmentMethods,
  EnrollmentModel,
} from "./enrollment.interface";

export const EnrollmentSchema = new Schema<
  IEnrollment,
  EnrollmentModel,
  IEnrollmentMethods
>(
  {
    courseId: {
      type: Schema.ObjectId,
      required: true,
    },
    studentId: {
      type: Schema.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["enrolled", "completed"],
      },
      default: "enrolled",
    },
    progress: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Enrollment = model<IEnrollment, EnrollmentModel>(
  "Enrollment",
  EnrollmentSchema,
);

export default Enrollment;
