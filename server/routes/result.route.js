import express from 'express';
import {
  getAllResults,
  getResultByCompetitorAndRaceId,
  createResult,
  updateResult,
  deleteResult,
} from '../controllers/result.controller.js';

const resultRoutes = express.Router();

// Get all results
resultRoutes.get('/results', getAllResults);

// Get result by competitor and race ID
resultRoutes.get('/results/:competitorId/:raceId', getResultByCompetitorAndRaceId);

// Create a new result
resultRoutes.post('/results', createResult);

// Update a result
resultRoutes.put('/results/:competitorId/:raceId', updateResult);

// Delete a result
resultRoutes.delete('/results/:competitorId/:raceId', deleteResult);

export default resultRoutes;
