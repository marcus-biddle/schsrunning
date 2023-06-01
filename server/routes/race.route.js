import express from 'express';
import {
  getAllRaces,
  getRaceById,
  createRace,
  updateRace,
  deleteRace,
} from '../controllers/race.controller.js';

const raceRoutes = express.Router();

// Get all races
raceRoutes.get('/races', getAllRaces);

// Get race by ID
raceRoutes.get('/races/:raceId', getRaceById);

// Create a new race
raceRoutes.post('/races', createRace);

// Update a race
raceRoutes.put('/races/:raceId', updateRace);

// Delete a race
raceRoutes.delete('/races/:raceId', deleteRace);

export default raceRoutes;
