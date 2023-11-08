import { Schema, model } from "mongoose";
import { ICourse, ICourseMethods, CourseModel } from "./course.interface";

export const CourseSchema = new Schema<ICourse, CourseModel, ICourseMethods>(
  {
    name: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
      default: "https://images.unsplash.com/photo-1501504905252-473c47e087f8",
    },
    duration: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    schedule: {
      type: String,
      required: true,
    },
    prerequisites: [
      {
        type: Schema.ObjectId,
        Ref: "Course",
      },
    ],
    enrollmentStatus: {
      type: String,
      enum: {
        values: ["open", "closed", "in-progress"],
      },
      default: "in-progress",
    },
    syllabus: [
      {
        week: {
          type: Number,
          required: true,
        },
        topic: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Course = model<ICourse, CourseModel>("Course", CourseSchema);

export default Course;
