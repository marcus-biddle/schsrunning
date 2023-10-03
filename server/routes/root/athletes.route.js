import express from 'express';
import { getAllAthletesHandler, getAthleteByAthleteIdHandler } from '../../controllers/root/athletes.controller.js';

const router = express.Router();

router.route('/athletes')
// GET all Athletes
.get(getAllAthletesHandler)
// Create New Athlete
// .post(authenticateRoles(ROLES_LIST.admin), createNewAthleteHandler);

// GET all Athletes
router.get('/athletes/:athleteId', getAthleteByAthleteIdHandler);



export default router;