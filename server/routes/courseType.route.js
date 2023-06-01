import express from 'express';
import { 
    getAllCourseTypes, 
    getCourseTypeById, 
    createCourseType, 
    updateCourseType, 
    deleteCourseType 
} from '../controllers/courseType.controller.js';

const courseTypeRoutes = express.Router();

// Get all course types
courseTypeRoutes.get('/courseType', getAllCourseTypes);

// Get course type by ID
courseTypeRoutes.get('/courseType/:courseTypeId', getCourseTypeById);

// Create a new course type
courseTypeRoutes.post('/courseType', createCourseType);

// Update a course type
courseTypeRoutes.put('/courseType/:courseTypeId', updateCourseType);

// Delete a course type
courseTypeRoutes.delete('/courseType/:courseTypeId', deleteCourseType);

export default courseTypeRoutes;
