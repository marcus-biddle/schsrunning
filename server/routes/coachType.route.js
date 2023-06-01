import express from 'express';
import {
  getAllCoachTypes,
  getCoachTypeById,
  createCoachType,
  updateCoachType,
  deleteCoachType,
} from '../controllers/coachType.controller.js';

const coachTypeRoutes = express.Router();

// Get all coach types
coachTypeRoutes.get('/coach-types', getAllCoachTypes);

// Get coach type by ID
coachTypeRoutes.get('/coach-types/:coachTypeId', getCoachTypeById);

// Create a new coach type
coachTypeRoutes.post('/coach-types', createCoachType);

// Update a coach type
coachTypeRoutes.put('/coach-types/:coachTypeId', updateCoachType);

// Delete a coach type
coachTypeRoutes.delete('/coach-types/:coachTypeId', deleteCoachType);

export default coachTypeRoutes;
