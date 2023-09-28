import express from 'express';
import { createNewCompetitorHandler, getAllCompetitorsHandler, getCompetitorByRaceIdHandler, getCompetitorByYearIdHandler } from '../../controllers/root/competitors.controller.js';
import { authenticateRoles } from '../../middleware/verifyRoles.js';
import { ROLES_LIST } from '../../config/_roles.js';

const router = express.Router();

// GET all competitors
router.route('/competitors')
  .get(getAllCompetitorsHandler)
  .post(authenticateRoles(ROLES_LIST.admin), createNewCompetitorHandler);

  // GET individual Competitor
  router.get('/competitors/:competitorId', getAllCompetitorsHandler);

  // GET all competitors by specific year
  router.get('/competitors/year/:yearId', getCompetitorByYearIdHandler); 

  // GET Competitor by race name
  router.get('/competitors', getCompetitorByRaceIdHandler);

  export default router;