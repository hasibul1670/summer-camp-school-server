import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidaion } from './student.validation';
const router = express.Router();

router.get('/:email', StudentController.getUserName);
router.get('/', StudentController.getAllStudents);
router.post('/create-student', StudentController.createStudent);
// router.get('/:id', StudentController.getSingleStudent);

router.delete('/:id', StudentController.deleteStudent);

router.patch(
  '/:id',
  validateRequest(StudentValidaion.updateStudentZodSchema),
  StudentController.updateStudent
);

export const StudentRoutes = router;
