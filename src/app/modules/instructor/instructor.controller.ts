/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendReponse from '../../../shared/sendResponse';
import { IInstructor } from './instructor.interface';
import { InstructorService } from './instructor.service';

const sendInstructorResponse = async (res: Response, message: string, data: any) => {
  sendReponse<IInstructor>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

const createInstructor: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...instructor } = req.body;
    const result = await InstructorService.createInstructor(instructor);
    sendInstructorResponse(res, 'Instructor created successfully!', result);
  }
);
//Get all Instructors
const getAllInstructors = catchAsync(async (req: Request, res: Response) => {
  const result = await InstructorService.getAllInstructors();
  sendInstructorResponse(res, ' All Instructor Instructors fetched successfully', result);
});
//Get a Single Instructor
const getSingleInstructor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await InstructorService.getSingleInstructor(id);
  sendInstructorResponse(res, 'Single Instructor is found', result);
});
//Update Instructor
const updateInstructor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await InstructorService.updateInstructor(id, req.body);
  await sendInstructorResponse(res, `Instructor is Updated successfully`, result);
});
//Delete a Single Instructor
const deleteInstructor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await InstructorService.deleteInstructor(id);
  await sendInstructorResponse(res, `Instructor is Deleted successfully`, result);
});

export const InstructorController = {
  createInstructor,
  deleteInstructor,
  getAllInstructors,
  getSingleInstructor,
  updateInstructor,
};
