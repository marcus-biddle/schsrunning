import express from 'express';
import {
  getAllRaceTimeTypes,
  getRaceTimeTypeById,
  createRaceTimeType,
  updateRaceTimeType,
  deleteRaceTimeType,
} from '../controllers/racetimeType.controller.js';

const raceTimeTypeRoutes = express.Router();

// Get all race time types
raceTimeTypeRoutes.get('/race-time-types', getAllRaceTimeTypes);

// Get race time type by ID
raceTimeTypeRoutes.get('/race-time-types/:raceTimeTypeId', getRaceTimeTypeById);

// Create a new race time type
raceTimeTypeRoutes.post('/race-time-types', createRaceTimeType);

// Update race time type by ID
raceTimeTypeRoutes.put('/race-time-types/:raceTimeTypeId', updateRaceTimeType);

// Delete race time type by ID
raceTimeTypeRoutes.delete('/race-time-types/:raceTimeTypeId', deleteRaceTimeType);

export default raceTimeTypeRoutes;

