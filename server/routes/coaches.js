/** There needs to be normalization in this files 
 * between the endpoints and what they do.
 * Some of it seems redundant and unnecessary.
 */
/** I should split this up again [ handlers, routes, ] */
import express from 'express';
import { getAllCoachesHandler, getCoachByIdHandler } from '../controllers/coaches.controller.js';

const router = express.Router();

// GET all coaches
router.get('/coaches', getAllCoachesHandler);

// GET Coach by year
router.get('/season-coaches/:yearId', async (req, res) => {
    const { yearId } = req.params;
    const query = `SELECT firstName, lastName, Coach.coachId, 
    GROUP_CONCAT(CoachType.coachType ORDER BY CoachType.coachTypeId ASC SEPARATOR ', ') AS coachType, year 
  FROM Coach
  JOIN CoachSeason ON Coach.coachId = CoachSeason.coachId
  JOIN CoachType ON CoachSeason.coachTypeId = CoachType.coachTypeId
  WHERE CoachSeason.year = ?
  GROUP BY Coach.coachId;`;
    const [rows] = await connection.query(query, yearId);
    res.send(rows)
  });

  // GET individual Coach
  router.get('/coaches/:coachId', getCoachByIdHandler);

  router.get('/coach-seasons', async (req, res) => {
    const { coachIds } = req.query;
  
    // Convert comma-separated string of coach IDs to an array
    const coachIdArray = coachIds.split(',').map(Number);
  
    // Prepare the MySQL query with placeholders for the coach IDs
    const query = `
      SELECT Coach.firstname, Coach.lastname, CoachSeason.*
      FROM CoachSeason
      INNER JOIN Coach ON CoachSeason.coachId = Coach.coachId
      WHERE CoachSeason.coachId IN (?)
    `;
  
    try {
      // Execute the query with the coach IDs array as a parameter
      const [rows] = await connection.query(query, [coachIdArray]);
  
      res.json(rows);
    } catch (error) {
      console.error("Error fetching coach seasons:", error);
      res.status(500).json({ error: "Failed to fetch coach seasons" });
    }
  });

  router.get('/coach-seasons/:coachId', async (req, res) => {
    const { coachId } = req.params;
  
    const query = `SELECT CoachSeason.*, Coach.firstname, Coach.lastname
    FROM CoachSeason
    JOIN Coach ON CoachSeason.coachId = Coach.coachId
    WHERE CoachSeason.coachId IN (?);
    `;
    const [rows] = await connection.query(query, coachId);
    
    if(!rows[0]) {
      return res.json({ msg: "Could not find coach's seasons." });
    };
  
    res.json(rows)
  });

  // This might be unused.
  router.get('/coach-types', async (req, res) => {
    const query = "SELECT * FROM CoachType";
    const [rows] = await connection.query(query);
    res.send(rows)
  });

  // GET coach type based on Coach
  router.get('/coach-types/:coachTypeId', async (req, res) => {
    const { coachTypeId } = req.params;
  
    const query = "SELECT * FROM CoachType WHERE CoachType.coachTypeId=?;";
    const [rows] = await connection.query(query, coachTypeId);
    
    if(!rows[0]) {
      return res.json({ msg: "Could not find coach type." });
    };
  
    res.json(rows[0])
  });

  export default router;