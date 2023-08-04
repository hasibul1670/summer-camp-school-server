/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { ICourse } from '../course/course.interface';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IInstructor = {
  id: string;
  role: string;
  email: string;
  password: string;
  name: UserName;
  phoneNumber: string;
  address: string;
  profileImage?: string;
  bio?: string;
  expertise: {
    primary: string;
    secondary: string;
  };
  course?: Types.ObjectId | ICourse;
  website?: string;
  socialMedia?: {
    facebook?: string;
    linkedin?: string;
    github?: string;
  };
};

export type IInstructorFilters = {
  searchTerm?: string;
  id?: string;
  phoneNumber?: string;
  name?: string;
};

export type InstructorModel = {
  isInstructorExist(
    email: string
  ): Promise<Pick<IInstructor, 'email' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IInstructor>;
