import express from 'express';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.INSTRUCTOR),
  CourseController.createCourse
);
router.get('/:id', CourseController.getSingleCourse);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CourseController.deleteCourse
);

router.patch(
  '/:id',
  validateRequest(CourseValidation.updateCourseZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  CourseController.updateCourse
);

router.get('/', CourseController.getAllCourses);

router.get('/instructor/:id', CourseController.getAllCoursesByInstructorId); 

export const CourseRoutes = router;
