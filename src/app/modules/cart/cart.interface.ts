import { Model, Types } from 'mongoose';
import { ICourse } from '../course/course.interface';

export type ICart = {
  course: Types.ObjectId | ICourse;
  email: string;
  enrolled?:boolean;
  finished?:boolean;

};

export type CartModel = Model<ICart>;
