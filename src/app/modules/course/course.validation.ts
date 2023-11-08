import { z } from "zod";

// Assuming you have a list of strings for the enrollmentStatus enum somewhere
const enrollmentStatusEnum = ["open", "closed", "in-progress"] as const;

// Zod schema for a single syllabus item
const syllabusSchema = z.object({
  week: z.number({
    required_error: "Week is required",
  }),
  topic: z.string({
    required_error: "Topic is required",
  }),
  content: z.string({
    required_error: "Content is required",
  }),
});

// Zod schema for the course creation
const createCourseSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    instructor: z.string({
      required_error: "Instructor is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
    thumbnail: z
      .string({
        required_error: "Thumbnail URL is required",
      })
      .url(),
    duration: z.string({
      required_error: "Duration is required",
    }),
    location: z.string({
      required_error: "Location is required",
    }),
    schedule: z.string({
      required_error: "Schedule is required",
    }),
    prerequisites: z.array(z.string()).optional(),
    enrollmentStatus: z.enum(enrollmentStatusEnum, {
      required_error: "Enrollment status is required",
    }),
    syllabus: z.array(syllabusSchema),
  }),
});

// Zod schema for the course update, which may not require all fields
const updateCourseSchema = z.object({
  body: createCourseSchema.shape.body.partial(),
});

export const CourseValidation = {
  create: createCourseSchema,
  update: updateCourseSchema,
};
