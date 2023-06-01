import express from 'express';
import {
  getAllRaceConditions,
  getRaceConditionById,
  createRaceCondition,
  updateRaceCondition,
  deleteRaceCondition,
} from '../controllers/raceCondition.controller.js';

const raceConditionRoutes = express.Router();

// Get all race conditions
raceConditionRoutes.get('/race-conditions', getAllRaceConditions);

// Get race condition by ID
raceConditionRoutes.get('/race-conditions/:raceConditionId', getRaceConditionById);

// Create a new race condition
raceConditionRoutes.post('/race-conditions', createRaceCondition);

// Update a race condition
raceConditionRoutes.put('/race-conditions/:raceConditionId', updateRaceCondition);

// Delete a race condition
raceConditionRoutes.delete('/race-conditions/:raceConditionId', deleteRaceCondition);

export default raceConditionRoutes;
