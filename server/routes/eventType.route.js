import express from 'express';
import {
  getAllEventTypes,
  getEventTypeById,
  createEventType,
  updateEventType,
  deleteEventType,
} from '../controllers/eventType.controller.js';

const eventTypeRoutes = express.Router();

// Get all event types
eventTypeRoutes.get('/event-types', getAllEventTypes);

// Get event type by ID
eventTypeRoutes.get('/event-types/:eventTypeId', getEventTypeById);

// Create a new event type
eventTypeRoutes.post('/event-types', createEventType);

// Update event type by ID
eventTypeRoutes.put('/event-types/:eventTypeId', updateEventType);

// Delete event type by ID
eventTypeRoutes.delete('/event-types/:eventTypeId', deleteEventType);

export default eventTypeRoutes;
