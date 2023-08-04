import express from 'express';
import { InstructorController } from './instructor.controller';


const router = express.Router();

router.post('/create-Instructor', InstructorController.createInstructor);
router.get('/:id', InstructorController.getSingleInstructor);
router.delete('/:id', InstructorController.deleteInstructor);
router.patch('/:id', InstructorController.updateInstructor);
router.get('/', InstructorController.getAllInstructors);






export const InstructorRoutes = router;
