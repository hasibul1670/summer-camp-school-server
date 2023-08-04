import { buildWhereConditions } from '../../../helpers/buildWhereCondition';
import { generateCourseId } from '../../../helpers/generateId';
import { IGenericResponse } from '../../../interfaces/common';
import { Instructor } from '../instructor/instructor.model';
import { courseSearchableFields } from './course.constant';
import { ICourse, ICourseFilters } from './course.interface';
import { Course } from './course.model';

const createCourse = async (payload: ICourse): Promise<ICourse> => {
  const CourseId = await generateCourseId();
  const CoursePayload: ICourse = { ...payload, id: CourseId };
  const result = await Course.create(CoursePayload);
  return result;
};

const getAllCourses = async (
  filters: ICourseFilters
  // paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICourse[]>> => {
  // const { limit, page, skip, sortBy, sortOrder } =
  //   paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const { whereConditions, sortConditions } = buildWhereConditions(
    searchTerm,
    filtersData,
    courseSearchableFields
    // sortBy,
    // sortOrder
  );

  const result = await Course.find(whereConditions).sort(sortConditions);

  const total = await Course.countDocuments();

  return {
    meta: {
      total,
    },
    data: result,
  };
};

const getSingleCourse = async (id: string) => {
  const result = await Course.find({ id: id })
    .populate('instructor')
    .populate('review')
    .populate('lessons');

  return result;
};
const getAllCoursesByInstructorId = async (id: string) => {
  const instructor = await Instructor.findOne({ id: id });
  const instructorId = instructor?._id;
  const result = await Course.find({ instructor: instructorId }).populate(
    'instructor'
  );
  // .populate('review')
  // .populate('lessons');

  return result;
};

const deleteCourse = async (id: string) => {
  const result = await Course.findOneAndDelete({ id: id });

  return result;
};
const updateCourse = async (
  id: string,
  payload: Partial<ICourse>
): Promise<ICourse | null> => {
  const result = await Course.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const CourseService = {
  createCourse,
  deleteCourse,
  getAllCourses,
  getAllCoursesByInstructorId,
  getSingleCourse,
  updateCourse,
};
