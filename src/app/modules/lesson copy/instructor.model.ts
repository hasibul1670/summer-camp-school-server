/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import config from '../../../config';

import bcrypt from 'bcrypt';
import { IInstructor, InstructorModel } from './instructor.interface';

export const InstructorSchema = new Schema<IInstructor, InstructorModel>(
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
    password: {
      type: String,
      required: true,
      select: 0,
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

    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    expertise: {
      type: String,
      required: true,
    },
    socialMediaLinks: {
      type: String,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'course',
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

InstructorSchema.statics.isInstructorExist = async function (
  email: string
): Promise<Pick<IInstructor, 'email' | 'password' | 'role'> | null> {
  return await Instructor.findOne(
    { email },
    { email: 1, password: 1, role: 1 }
  );
};

InstructorSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// hashing Instructor password
InstructorSchema.pre('save', async function (next) {
  const Instructor = this;
  Instructor.password = await bcrypt.hash(
    Instructor.password,
    Number(config.default_salt_rounds)
  );
  next();
});

export const Instructor = model<IInstructor, InstructorModel>(
  'Instructor',
  InstructorSchema
);
