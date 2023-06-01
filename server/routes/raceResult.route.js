import express from 'express';
import {
  getAllRaceResults,
  getRaceResult,
  createRaceResult,
  updateRaceResult,
  deleteRaceResult,
} from '../controllers/raceResult.controller.js';

const raceResultRoutes = express.Router();

// Get all race results
raceResultRoutes.get('/race-results', getAllRaceResults);

// Get race result by competitor ID and event ID
raceResultRoutes.get('/race-results/:competitorId/:eventId', getRaceResult);

// Create a new race result
raceResultRoutes.post('/race-results', createRaceResult);

// Update race result by competitor ID and event ID
raceResultRoutes.put('/race-results/:competitorId/:eventId', updateRaceResult);

// Delete race result by competitor ID and event ID
raceResultRoutes.delete('/race-results/:competitorId/:eventId', deleteRaceResult);

export default raceResultRoutes;
