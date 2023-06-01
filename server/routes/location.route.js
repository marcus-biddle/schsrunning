import express from 'express';
import {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} from '../controllers/location.controller.js';

const locationRoutes = express.Router();

// Get all locations
locationRoutes.get('/locations', getAllLocations);

// Get location by ID
locationRoutes.get('/locations/:locationId', getLocationById);

// Create a new location
locationRoutes.post('/locations', createLocation);

// Update a location
locationRoutes.put('/locations/:locationId', updateLocation);

// Delete a location
locationRoutes.delete('/locations/:locationId', deleteLocation);

export default locationRoutes;
