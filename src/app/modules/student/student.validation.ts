import { z } from 'zod';
import { gender } from '../student/student.constant';

const updateStudentZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    }),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

export const StudentValidaion = {
  updateStudentZodSchema,
};
