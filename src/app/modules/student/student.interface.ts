/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { ICourse } from '../course/course.interface';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IStudent = {
  id: string;
  role: string;
  password: string;
  email: string;
  name: UserName;
  gender:'male' | 'female';
  enrolledCourses?: Types.ObjectId | ICourse;
  completedCourses?: Types.ObjectId | ICourse;
  dateOfBirth?: string;
  contactNo: string;
  address: string;
  profileImage?: string;
};

export type StudentModel = {
  isStudentExist(
    email: string
  ): Promise<Pick<IStudent, 'email' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IStudent>;

export type IStudentFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
