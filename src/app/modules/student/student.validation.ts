import { z } from "zod";
import { bloodGroupEnum, genderEnum } from "./student.constant";

const updateSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    gender: z.enum([...genderEnum] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    address: z.string().optional(),
    bloodGroup: z.enum([...bloodGroupEnum] as [string, ...string[]]).optional(),
    profileImage: z.string().url().optional(),
  }),
});

export const StudentValidation = {
  updateSchema,
};
