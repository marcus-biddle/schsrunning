import express from 'express';
import { getAllCoursesHandler,  getCourseByDistanceHandler, getCourseByIdHandler, getCourseByRaceIdHandler } from '../../controllers/root/courses.controller.js';
const router = express.Router();

// GET all Courses
router.get('/courses', getAllCoursesHandler);

// GET Courses by id
router.get('/courses/:courseId', getCourseByIdHandler);

// GET courses by distance
router.get('/courses/distance/:courseDistance', getCourseByDistanceHandler);

// GET course by race Id
app.get('/courses-by-race/:raceNameId', getCourseByRaceIdHandler);

export default router;