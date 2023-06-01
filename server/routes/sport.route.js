import express from 'express';
import {
  getAllSports,
  getSportById,
  createSport,
  deleteSport,
} from '../controllers/sport.controller.js';

const sportRoutes = express.Router();

// Get all sports
sportRoutes.get('/sports', getAllSports);

// Get sport by ID
sportRoutes.get('/sports/:sportId', getSportById);

// Create a new sport
sportRoutes.post('/sports', createSport);

// Delete a sport
sportRoutes.delete('/sports/:sportId', deleteSport);

export default sportRoutes;
