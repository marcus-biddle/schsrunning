import express from 'express';
import {
  getAllAthletes,
  getAthleteById,
  createAthlete,
  updateAthlete,
  deleteAthlete
} from './controllers/athlete.controller.js';

const athleteRoutes = express.Router();

// Get all athletes
athleteRoutes.get('/athletes', getAllAthletes);

// Get athlete by ID
athleteRoutes.get('/athletes/:id', getAthleteById);

// Create a new athlete
athleteRoutes.post('/athletes', createAthlete);

// Update athlete by ID
athleteRoutes.put('/athletes/:id', updateAthlete);

// Delete athlete by ID
athleteRoutes.delete('/athletes/:id', deleteAthlete);

export default athleteRoutes;
