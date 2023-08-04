/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { ICourse } from '../cart/cart.interface';

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
  socialMediaLinks?: string;
  bio?: string;
  expertise?: string[];
  course?: Types.ObjectId | ICourse;
  website?: string;
  socialMedia?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  coursesTaught: Types.ObjectId | ICourse;
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
