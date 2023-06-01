import express from 'express';
import {
  getAllSpecialAchievers,
  getSpecialAchiever,
  createSpecialAchiever,
  deleteSpecialAchiever,
} from '../controllers/specialAchiever.controller.js';

const specialAchieverRoutes = express.Router();

// Get all special achievers
specialAchieverRoutes.get('/special-achievers', getAllSpecialAchievers);

// Get special achiever by competitor ID and special achievement ID
specialAchieverRoutes.get('/special-achievers/:competitorId/:specialAchievementId', getSpecialAchiever);

// Create a new special achiever
specialAchieverRoutes.post('/special-achievers', createSpecialAchiever);

// Delete a special achiever
specialAchieverRoutes.delete('/special-achievers/:competitorId/:specialAchievementId', deleteSpecialAchiever);

export default specialAchieverRoutes;
