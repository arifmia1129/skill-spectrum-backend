import { z } from "zod";
import { bloodGroupEnum, genderEnum } from "../student/student.constant";

const createStudentSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: "First name must be required",
        }),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      }),
      gender: z.enum([...genderEnum] as [string, ...string[]], {
        required_error: "Gender is required",
      }),
      dateOfBirth: z.string({
        required_error: "Date of Birth is required",
      }),
      email: z
        .string({
          required_error: "Email is required",
        })
        .email(),
      contactNo: z.string({
        required_error: "Contact number is required",
      }),
      emergencyContactNo: z.string({
        required_error: "Emergency Contact number is required",
      }),
      address: z.string({
        required_error: "Present address is required",
      }),
      bloodGroup: z
        .enum([...bloodGroupEnum] as [string, ...string[]], {
          required_error: "Blood group is required",
        })
        .optional(),
      profileImage: z.string().url().optional(),
    }),
  }),
});

export const UserValidation = {
  createStudentSchema,
};
