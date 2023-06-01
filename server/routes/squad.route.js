import express from 'express';
import {
  getAllSquads,
  getSquadById,
  createSquad,
  deleteSquad,
} from '../controllers/squad.controller.js';

const squadRoutes = express.Router();

// Get all squads
squadRoutes.get('/squads', getAllSquads);

// Get squad by ID
squadRoutes.get('/squads/:squadId', getSquadById);

// Create a new squad
squadRoutes.post('/squads', createSquad);

// Delete a squad
squadRoutes.delete('/squads/:squadId', deleteSquad);

export default squadRoutes;
