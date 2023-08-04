import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { default as sendReponse } from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constant';
import { IStudent } from './student.interface';
import { StudentService } from './student.service';

const sendStudentResponse = async (
  res: Response,
  message: string,
  data: any
) => {
  sendReponse<IStudent>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { ...student } = req.body;
  const result = await StudentService.createStudent(student);
  sendStudentResponse(res, 'Student is created successfully', result);
});

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await StudentService.getAllStudents(
    filters,
    paginationOptions
  );

  sendStudentResponse(res, ' All Students  return successfully', result);
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentService.getSingleStudent(id);
  sendStudentResponse(res, ' Single Student retrieved successfully !', result);
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await StudentService.updateStudent(id, updatedData);

  sendStudentResponse(res, 'Student updated successfully !', result);
});
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.deleteStudent(id);
  sendStudentResponse(res, 'Student deleted successfully !', result);
});
const getUserName = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;
  const result = await StudentService.getUserName(email);
  sendStudentResponse(res, 'User Data Get successfully !', result);
});

export const StudentController = {
  getAllStudents,
  createStudent,
  getUserName,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
