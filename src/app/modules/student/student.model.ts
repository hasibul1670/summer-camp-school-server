/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { gender } from './student.constant';
import { IStudent, StudentModel } from './student.interface';

import bcrypt from 'bcrypt';
import config from '../../../config';

export const StudentSchema = new Schema<IStudent, StudentModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    gender: {
      type: String,
      enum: gender,
    },
    dateOfBirth: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    contactNo: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

StudentSchema.statics.isStudentExist = async function (
  email: string
): Promise<Pick<IStudent, 'email' | 'password' | 'role'> | null> {
  return await Student.findOne({ email }, { email: 1, password: 1, role: 1 });
};

//password Matching

StudentSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// hashing user password
StudentSchema.pre('save', async function (next) {
  const student = this;
  student.password = await bcrypt.hash(
    student.password,
    Number(config.default_salt_rounds)
  );
  next();
});

export const Student = model<IStudent, StudentModel>('Student', StudentSchema);
