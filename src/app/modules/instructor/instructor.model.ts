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
      type: {
        primary: {
          type: String,
          required: true,
        },
        secondary: {
          type: String,
        },
      },
    },

    socialMedia: {
      type: {
        facebook: {
          type: String,
        },
        linkedin: {
          type: String,
        },
        github: {
          type: String,
        },
      },
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

InstructorSchema.pre('save', async function (next) {
  const existingCourse = await Instructor.findOne({ email: this.email });
  if (existingCourse) {
    throw new Error('This Email is already Exist');
  }
  next();
});

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
