import { z } from "zod";

// Define the enum for enrollment status
const enrollmentStatusEnum = ["enrolled", "completed"] as const;

// Zod schema for enrollment creation
const createEnrollmentSchema = z.object({
  body: z.object({
    courseId: z.string({
      required_error: "Course ID is required",
    }),
    studentId: z.string({
      required_error: "Student ID is required",
    }),
    status: z.enum(enrollmentStatusEnum).optional(),
    progress: z
      .number({
        required_error: "Progress is required",
      })
      .min(0)
      .max(100)
      .optional(), // Assuming progress is a percentage between 0 and 100
  }),
});

const updateEnrollmentSchema = z.object({
  body: z.object({
    status: z.enum(enrollmentStatusEnum).optional(),
    progress: z.number().min(0).max(100).optional(),
  }),
});

export const EnrollmentValidation = {
  create: createEnrollmentSchema,
  update: updateEnrollmentSchema,
};
