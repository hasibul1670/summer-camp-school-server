import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ICourse } from './course.interface';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendReponse from '../../../shared/sendResponse';
import { CourseService } from './course.services';
import { courseFilterableFields } from './course.constant';


const sendFacultyResponse = (res: Response, message: string, data: any) => {
  sendReponse<ICourse>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const { ...CourseData } = req.body;
  const result = await CourseService.createCourse(
    CourseData
  );
  sendFacultyResponse(res, 'Course is Created Successfully!', result);
});

const getAllCourses = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query,courseFilterableFields);
  //const paginationOptions = pick(req.query, paginationFields);
  const result = await CourseService.getAllCourses(filters);
  sendFacultyResponse(res, 'Courses retrieved successfully !', result);
});

const getAllCoursesByInstructorId = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CourseService.getAllCoursesByInstructorId(id);
  
  sendFacultyResponse(res, 'Courses retrieved successfully by InstructorId !', result);
});
const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CourseService.deleteCourse(id);
  sendFacultyResponse(res, ' Course Deleted successfully !', result);
});
const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CourseService.getSingleCourse(id);
  sendFacultyResponse(res, 'Single Course retrieved successfully !', result);
});
const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const UpdateData = req.body;
  const result = await CourseService.updateCourse(id, UpdateData);
  sendFacultyResponse(res, 'Course Data Is Updated successfully!', result);
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  getAllCoursesByInstructorId
};