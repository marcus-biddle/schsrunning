import express from 'express';
import { getAllCoachesByYearHandler, getAllCoachesHandler, getCoachByIdHandler, getCoachTypeByCoachIdHandler } from '../../controllers/root/coaches.controller.js';

const router = express.Router();

// GET all coaches
router.route('/coaches')
  .get(getAllCoachesHandler);

// GET individual Coach
// router.get('/coaches/:coachId', getCoachByIdHandler);

// // GET Coach by year
// router.get('/coaches/season/:yearId', getAllCoachesByYearHandler);

// // GET coach type based on Coach
// router.get('/coaches/types/:coachTypeId', getCoachTypeByCoachIdHandler);

//  // GET an Array of years that a coach has been in
//  router.get('/coaches/seasons/years/:coachId', getAllCoachesByYearHandler);




// This is how to protect a select route
// router.route('/coaches')
//   .get(authenticateToken, getAllCoachesHandler);


// This is how to authenticate roles for a route
// router.route('/coaches')
// .post(authenticateRoles(ROLES_LIST.admin, ROLES_LIST.editor),getAllCoachesHandler);



  // Cannot remember why I use this....
  // router.get('/coach-seasons', async (req, res) => {
  //   const { coachIds } = req.query;
  
  //   // Convert comma-separated string of coach IDs to an array
  //   const coachIdArray = coachIds.split(',').map(Number);
  
  //   // Prepare the MySQL query with placeholders for the coach IDs
  //   const query = `
  //     SELECT Coach.firstname, Coach.lastname, CoachSeason.*
  //     FROM CoachSeason
  //     INNER JOIN Coach ON CoachSeason.coachId = Coach.coachId
  //     WHERE CoachSeason.coachId IN (?)
  //   `;
  
  //   try {
  //     // Execute the query with the coach IDs array as a parameter
  //     const [rows] = await connection.query(query, [coachIdArray]);
  
  //     res.json(rows);
  //   } catch (error) {
  //     console.error("Error fetching coach seasons:", error);
  //     res.status(500).json({ error: "Failed to fetch coach seasons" });
  //   }
  // });

 
  // This might be unused.
  // router.get('/coach-types', async (req, res) => {
  //   const query = "SELECT * FROM CoachType";
  //   const [rows] = await connection.query(query);
  //   res.send(rows)
  // });

  
  export default router;