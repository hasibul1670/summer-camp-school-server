import { Schema, model } from 'mongoose';

import { courseMonths } from './course.constant';
import { CourseModel, ICourse } from './course.interface';

const courseSchema = new Schema<ICourse>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: 'Instructor',
    },
    lessons: {
      type: Schema.Types.ObjectId,
      ref: 'Instructor',
    },
    review: {
      type: Schema.Types.ObjectId,
      ref: 'Instructor',
    },
    duration: {
      type: String,
    },
    enrollmentDeadline: {
      type: Date,
    },
    rating: {
      type: Number,
      required: true,
    },
    isFeatured: {
      type: Boolean,
    },
    courseImage: {
      type: String,
      required: true,
    },

    year: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    startMonth: {
      type: String,
      required: true,
      enum: courseMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: courseMonths,
    },
  },
  {
    timestamps: true,
  }
);

courseSchema.pre('save', async function (next) {
  const existingCourse = await Course.findOne({ title: this.title });
  if (existingCourse) {
    throw new Error('This Course is already Exist');
  }
  next();
});

export const Course = model<ICourse, CourseModel>('course', courseSchema);
