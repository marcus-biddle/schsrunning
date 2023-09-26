import express from 'express';
import { createNewAthleteHandler, getAllAthletesHandler, getAthleteByAthleteIdHandler } from '../../controllers/root/athletes.controller.js';
import { authenticateRoles } from '../../middleware/verifyRoles.js';

const router = express.Router();

router.route('/athletes')
// GET all Athletes
.get(getAllAthletesHandler)
// Create New Athlete
.post(authenticateRoles(ROLES_LIST.admin), createNewAthleteHandler);

// GET all Athletes
router.get('/athletes/:athleteId', getAthleteByAthleteIdHandler);



export default router;