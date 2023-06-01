import express from 'express';
import {
  getAllAwards,
  getAwardById,
  createAward,
  deleteAward,
} from '../controllers/award.controller.js';

const awardRoutes = express.Router();

// Get all awards
awardRoutes.get('/awards', getAllAwards);

// Get award by ID
awardRoutes.get('/awards/:awardId', getAwardById);

// Create a new award
awardRoutes.post('/awards', createAward);

// Delete an award
awardRoutes.delete('/awards/:awardId', deleteAward);

export default awardRoutes;
