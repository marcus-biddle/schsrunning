import express from 'express';
import { connection } from '../utility/database.js';
const router = express.Router();

// GET all competitors
router.get('/competitors', async (req, res) => {

    const query = "SELECT DISTINCT * FROM Competitor;";
    const [rows] = await connection.query(query, []);
    
    if (!rows[0]) {
      return res.json({ msg: "Could not find competitors." });
    }
  
    res.send(rows);
  });

  // GET individual Competitor
  router.get('/competitors/:competitorId', async (req, res) => {
    const { competitorId } = req.params;
  
    const query = "SELECT * FROM Competitor WHERE Competitor.competitorId=?;";
    const [rows] = await connection.query(query, competitorId);
    
    if(!rows[0]) {
      return res.json({ msg: "Could not find competitor.", competitor: competitorId });
    };
  
    res.json(rows)
  });

  // GET all competitors by specific year
  router.get('/competitors/year/:yearId', async (req, res) => {
    const { yearId } = req.params;
    const query = "SELECT * FROM Competitor WHERE Competitor.year = ?";
    const [rows] = await connection.query(query, [yearId]);
  
    if(!rows[0]) {
      return res.json({ msg: "Could not find competitors." });
    };
  
    res.send(rows);
  }); 

  // GET Competitor by race name
  router.get('/competitors-by-course', async (req, res) => {
    const { raceNameId } = req.query;
  
    const query = `
  SELECT r.raceId, r.raceNameId, r.raceConditionId, r.courseId, r.date, res.competitorId, res.time, res.pace, CONCAT(a.firstName, ' ', a.lastName) AS fullName
  FROM Race r
  INNER JOIN Result res ON r.raceId = res.raceId
  INNER JOIN Competitor c ON res.competitorId = c.competitorId
  INNER JOIN Athlete a ON c.athleteId = a.athleteId
  WHERE r.raceNameId = ?
  GROUP BY r.date, r.raceId, r.raceNameId, r.raceConditionId, r.courseId, res.competitorId, res.time, res.pace, CONCAT(a.firstName, ' ', a.lastName);`;
    const [rows] = await connection.query(query, [raceNameId]);
    
    if(!rows[0]) {
      return res.json({ msg: "Could not find competitors." });
    };
  
    res.json(rows)
  });

  export default router;