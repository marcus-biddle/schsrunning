import express from 'express';
import {
  getAllRaceNames,
  getRaceNameById,
  createRaceName,
  updateRaceName,
  deleteRaceName,
} from '../controllers/raceName.controller.js';

const raceNameRoutes = express.Router();

// Get all race names
raceNameRoutes.get('/race-names', getAllRaceNames);

// Get race name by ID
raceNameRoutes.get('/race-names/:raceNameId', getRaceNameById);

// Create a new race name
raceNameRoutes.post('/race-names', createRaceName);

// Update a race name
raceNameRoutes.put('/race-names/:raceNameId', updateRaceName);

// Delete a race name
raceNameRoutes.delete('/race-names/:raceNameId', deleteRaceName);

export default raceNameRoutes;
