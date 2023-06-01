import express from 'express';
import {
  getAllCompetitors,
  createCompetitor,
  updateCompetitor,
  deleteCompetitor,
} from '../controllers/competitor.controller.js';

const competitorRoutes = express.Router();

// Routes for Competitors
competitorRoutes.get('/competitors', getAllCompetitors);
competitorRoutes.post('/competitors', createCompetitor);
competitorRoutes.put('/competitors/:competitorId', updateCompetitor);
competitorRoutes.delete('/competitors/:competitorId', deleteCompetitor);

export default competitorRoutes;
