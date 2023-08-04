import { z } from 'zod';
import { courseMonths } from './course.constant';

const createCourseZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    year: z.string({
      required_error: 'Year is required ',
    }),
    startMonth: z.enum([...courseMonths] as [string, ...string[]], {
      required_error: 'Start month is needed',
    }),
    endMonth: z.enum([...courseMonths] as [string, ...string[]], {
      required_error: 'End month is needed',
    }),
  }),
});
const updateCourseZodSchema = z.object({
  body: z.object({
    title: z.string({}).optional(),
    year: z.string({}).optional(),
    startMonth: z
      .enum([...courseMonths] as [string, ...string[]], {})
      .optional(),
    endMonth: z.enum([...courseMonths] as [string, ...string[]], {}).optional(),
  }),
});

export const CourseValidation = {
  createCourseZodSchema,
  updateCourseZodSchema,
};
