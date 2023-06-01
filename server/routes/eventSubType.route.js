import express from 'express';
import {
  getAllEventSubTypes,
  getEventSubTypeById,
  createEventSubType,
  updateEventSubType,
  deleteEventSubType,
} from '../controllers/eventSubType.controller.js';

const eventSubTypeRoutes = express.Router();

// Get all event subtypes
eventSubTypeRoutes.get('/event-subtypes', getAllEventSubTypes);

// Get event subtype by ID
eventSubTypeRoutes.get('/event-subtypes/:eventSubTypeId', getEventSubTypeById);

// Create a new event subtype
eventSubTypeRoutes.post('/event-subtypes', createEventSubType);

// Update event subtype by ID
eventSubTypeRoutes.put('/event-subtypes/:eventSubTypeId', updateEventSubType);

// Delete event subtype by ID
eventSubTypeRoutes.delete('/event-subtypes/:eventSubTypeId', deleteEventSubType);

export default eventSubTypeRoutes;
