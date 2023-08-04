import { Model, Types } from 'mongoose';
import { IInstructor } from '../instructor/instructor.interface';

export type ICourseMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type ICourse = {
  id: string;
  title: string;
  courseDescription: string;
  year: string;
  category: string;
  instructor?: Types.ObjectId | IInstructor;
  startMonth: ICourseMonths;
  endMonth: ICourseMonths;
  price: number;
  duration?: string;
  enrollmentDeadline?: Date;
  language?: string;
  prerequisites?: string;
  courseImage?: string;
  isFeatured?: boolean;
  rating?: number;

  lessons?: Types.ObjectId | IInstructor;
  review?: Types.ObjectId | IInstructor;

};



export type Review = {
  studentName: string;
  comment: string;
  rating: number;
};

export type CourseModel = Model<ICourse>;

export type ICourseFilters = {
  searchTerm?: string;
};
