import express from 'express';
import {
  getAllFieldResults,
  getFieldResultByIds,
  createFieldResult,
  updateFieldResult,
  deleteFieldResult,
} from '../controllers/fieldResult.controller.js';

const fieldResultRouter = express.Router();

// Get all field results
fieldResultRouter.get('/field-results', getAllFieldResults);

// Get field result by competitor ID and event ID
fieldResultRouter.get('/field-results/:competitorId/:eventId', getFieldResultByIds);

// Create a new field result
fieldResultRouter.post('/field-results', createFieldResult);

// Update field result by competitor ID and event ID
fieldResultRouter.put('/field-results/:competitorId/:eventId', updateFieldResult);

// Delete field result by competitor ID and event ID
fieldResultRouter.delete('/field-results/:competitorId/:eventId', deleteFieldResult);

export default fieldResultRouter;
