import express from 'express';
import {
  getAllCoachSeasons,
  getCoachSeasonById,
  createCoachSeason,
  deleteCoachSeason,
} from '../controllers/coachSeason.controller.js';

const coachSeasonRoutes = express.Router();

// Get all coach seasons
coachSeasonRoutes.get('/coach-seasons', getAllCoachSeasons);

// Get coach season by ID
coachSeasonRoutes.get('/coach-seasons/:coachId/:coachTypeId/:year', getCoachSeasonById);

// Create a new coach season
coachSeasonRoutes.post('/coach-seasons', createCoachSeason);

// Delete a coach season
coachSeasonRoutes.delete('/coach-seasons/:coachId/:coachTypeId/:year', deleteCoachSeason);

export default coachSeasonRoutes;
