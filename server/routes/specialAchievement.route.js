import express from 'express';
import {
  getAllSpecialAchievements,
  getSpecialAchievementById,
  createSpecialAchievement,
  deleteSpecialAchievement,
} from '../controllers/specialAchievement.controller.js';

const specialAchievementRoutes = express.Router();

// Get all special achievements
specialAchievementRoutes.get('/special-achievements', getAllSpecialAchievements);

// Get special achievement by ID
specialAchievementRoutes.get('/special-achievements/:specialAchievementId', getSpecialAchievementById);

// Create a new special achievement
specialAchievementRoutes.post('/special-achievements', createSpecialAchievement);

// Delete a special achievement
specialAchievementRoutes.delete('/special-achievements/:specialAchievementId', deleteSpecialAchievement);

export default specialAchievementRoutes;
