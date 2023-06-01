import express from 'express';
import {
  getAllCoaches,
  getCoachById,
  createCoach,
  updateCoach,
  deleteCoach,
} from '../controllers/coach.controller.js';

const coachRoutes = express.Router();

// Get all coaches
coachRoutes.get('/coaches', getAllCoaches);

// Get coach by ID
coachRoutes.get('/coaches/:coachId', getCoachById);

// Create a new coach
coachRoutes.post('/coaches', createCoach);

// Update a coach
coachRoutes.put('/coaches/:coachId', updateCoach);

// Delete a coach
coachRoutes.delete('/coaches/:coachId', deleteCoach);

export default coachRoutes;
