import express from 'express';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/course.controller.js';

const courseRoutes = express.Router();

// Get all courses
courseRoutes.get('/courses', getAllCourses);

// Get course by ID
courseRoutes.get('/courses/:courseId', getCourseById);

// Create a new course
courseRoutes.post('/courses', createCourse);

// Update a course
courseRoutes.put('/courses/:courseId', updateCourse);

// Delete a course
courseRoutes.delete('/courses/:courseId', deleteCourse);

export default courseRoutes;
