import express from 'express';
import {
  getAllAwardees,
  getAwardee,
  createAwardee,
  deleteAwardee,
} from '../controllers/awardee.controller.js';

const awardeeRoutes = express.Router();

// Get all awardees
awardeeRoutes.get('/awardees', getAllAwardees);

// Get awardee by athlete ID, award ID, squad ID, and year
awardeeRoutes.get('/awardees/:athleteId/:awardId/:squadId/:year', getAwardee);

// Create a new awardee
awardeeRoutes.post('/awardees', createAwardee);

// Delete an awardee
awardeeRoutes.delete('/awardees/:athleteId/:awardId/:squadId/:year', deleteAwardee);

export default awardeeRoutes;
