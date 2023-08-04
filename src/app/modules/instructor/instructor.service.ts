/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import config from '../../../config';
import { generateInstructorId } from '../../../helpers/generateId';
import { IInstructor } from './instructor.interface';
import { Instructor } from './instructor.model';

//getAllInstructor Service Section
const getAllInstructors = async () => {
  const result = await Instructor.find({}).populate('course');
  return result;
};

//getSingleInstructor Service Section
const getSingleInstructor = async (id: string) => {
  const result = await Instructor.findOne({ id }).populate('course');
  return result;
};
//updateInstructor Service Section
const updateInstructor = async (id: string, payload: Partial<IInstructor>) => {
  const result = await Instructor.findOneAndUpdate({ id }, payload, {
    new: true,
  });

  return result;
};
//deleteInstructor Service Section
const deleteInstructor = async (id: string) => {
  const result = await Instructor.findOneAndDelete({ id });
  return result;
};

///create Instructor

const createInstructor = async (payload: IInstructor) => {
  if (!payload.password) {
    payload.password = config.default_user_pass as string;
  }
  if (!payload.role) {
    payload.role = 'instructor' as string;
  }

  const instructorId = await generateInstructorId();
  const instructorPayload: IInstructor = { ...payload, id: instructorId };
  const createdInstructor = await Instructor.create(instructorPayload);
  const { password, ...result } = createdInstructor.toObject();
  return result;
};

export const InstructorService = {
  getAllInstructors,
  getSingleInstructor,
  deleteInstructor,
  updateInstructor,
  createInstructor,
};
