import express from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/event.controller.js';

const eventRoutes = express.Router();

// Get all events
eventRoutes.get('/events', getAllEvents);

// Get event by ID
eventRoutes.get('/events/:eventId', getEventById);

// Create a new event
eventRoutes.post('/events', createEvent);

// Update event by ID
eventRoutes.put('/events/:eventId', updateEvent);

// Delete event by ID
eventRoutes.delete('/events/:eventId', deleteEvent);

export default eventRoutes;
