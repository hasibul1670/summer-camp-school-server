/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import config from '../../../config';
import { ApiError } from '../../../handlingError/ApiError';
import { buildWhereConditions } from '../../../helpers/buildWhereCondition';
import { generateStudentId } from '../../../helpers/generateId';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { IInstructor } from '../instructor/instructor.interface';
import { Instructor } from '../instructor/instructor.model';
import { studentSearchableFields } from './student.constant';
import { IStudent, IStudentFilters } from './student.interface';
import { Student } from './student.model';

const getAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { whereConditions, sortConditions } = buildWhereConditions(
    searchTerm,
    filtersData,
    studentSearchableFields,
    sortBy,
    sortOrder
  );
  const result = await Student.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id);
  return result;
};

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const result = await Student.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id);
  return result;
};

const createStudent = async (payload: IStudent) => {
  if (!payload.password) {
    payload.password = config.default_user_pass as string;
  }
  const studentId = await generateStudentId();

  const existingStudent = await Student.findOne({ email: payload?.email });

  if (existingStudent) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'Email already exists in the database'
    );
  }

  const studentPayload: IStudent = { ...payload, id: studentId };

  const createdStudent = await Student.create(studentPayload);
  const { password, ...result } = createdStudent.toObject();
  return result;
};

const getUserName = async (
  email: string
): Promise<IStudent | IInstructor | IAdmin | null> => {
  let result: IStudent | IInstructor | IAdmin | null = null;

  result = await Student.findOne({ email: email });
  if (result) {
    return result;
  }

  result = await Instructor.findOne({ email: email });
  if (result) {
    return result;
  }

  result = await Admin.findOne({ email: email });
  return result;
};

export const StudentService = {
  getAllStudents,
  getUserName,
  createStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
