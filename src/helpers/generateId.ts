import { Admin } from '../app/modules/admin/admin.model';
import { Course } from '../app/modules/course/course.model';
import { Instructor } from '../app/modules/instructor/instructor.model';
import { Student } from '../app/modules/student/student.model';

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastCourse = await Student.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastCourse?.id ? lastCourse.id.substring(2) : undefined;
};

export const generateStudentId = async (): Promise<string> => {
  const currentId = await findLastStudentId();
  const parsedId = currentId ? parseInt(currentId) : 0;
  const incrementedId = (parsedId + 1).toString().padStart(5, '0');
  const courseId = `S-${incrementedId}`;
  return courseId;
};

export const findLastCourseId = async (): Promise<string | undefined> => {
  const lastCourse = await Course.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastCourse?.id ? lastCourse.id.substring(2) : undefined;
};

export const generateCourseId = async (): Promise<string> => {
  const currentId = await findLastCourseId();
  const parsedId = currentId ? parseInt(currentId) : 0;
  const incrementedId = (parsedId + 1).toString().padStart(5, '0');
  const courseId = `C-${incrementedId}`;

  return courseId;
};

export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastFaculty = await Admin.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `A-${incrementedId}`;

  return incrementedId;
};










export const findLastInstructorId = async (): Promise<string | undefined> => {
  const lastCourse = await Instructor.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastCourse?.id ? lastCourse.id.substring(2) : undefined;
};

export const generateInstructorId = async (): Promise<string> => {
  const currentId = await findLastInstructorId();
  const parsedId = currentId ? parseInt(currentId) : 0;
  const incrementedId = (parsedId + 1).toString().padStart(5, '0');
  const courseId = `I-${incrementedId}`;
  return courseId;
};


