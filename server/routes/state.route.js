import express from 'express';
import {
  getAllStates,
  getStateById,
  createState,
  updateState,
  deleteState,
} from '../controllers/state.controller.js';

const stateRoutes = express.Router();

// Get all states
stateRoutes.get('/states', getAllStates);

// Get state by ID
stateRoutes.get('/states/:stateId', getStateById);

// Create a new state
stateRoutes.post('/states', createState);

// Update a state
stateRoutes.put('/states/:stateId', updateState);

// Delete a state
stateRoutes.delete('/states/:stateId', deleteState);

export default stateRoutes;
