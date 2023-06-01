import express from 'express';
import {
  getAllRelayResults,
  getRelayResult,
  createRelayResult,
  updateRelayResult,
  deleteRelayResult,
} from '../controllers/relayResult.controller.js';

const relayResultRoutes = express.Router();

// Get all relay results
relayResultRoutes.get('/relay-results', getAllRelayResults);

// Get relay result by competitor IDs and event ID
relayResultRoutes.get('/relay-results/:competitorId1/:competitorId2/:competitorId3/:competitorId4/:eventId', getRelayResult);

// Create a new relay result
relayResultRoutes.post('/relay-results', createRelayResult);

// Update relay result by competitor IDs and event ID
relayResultRoutes.put('/relay-results/:competitorId1/:competitorId2/:competitorId3/:competitorId4/:eventId', updateRelayResult);

// Delete relay result by competitor IDs and event ID
relayResultRoutes.delete('/relay-results/:competitorId1/:competitorId2/:competitorId3/:competitorId4/:eventId', deleteRelayResult);

export default relayResultRoutes;
