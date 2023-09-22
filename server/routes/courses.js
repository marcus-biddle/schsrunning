import express from 'express';
import { connection } from '../utility/database.js';
const router = express.Router();

// GET all Courses
router.get('/courses', async (req, res) => {
    const query = "SELECT * FROM Course";
    const [rows] = await connection.query(query);
    res.send(rows)
  });

  // GET Courses by id
router.get('/courses/:courseId', async (req, res) => {
    const { courseId } = req.params;
  
    const query = "SELECT * FROM Course WHERE Course.courseId=?;";
  
    try {
      const [rows] = await connection.query(query, courseId);
    
      if(!rows[0]) {
        return res.json({ msg: "Could not find course." });
      };
    
      res.json(rows[0])
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET courses by distance
router.get('/courses/distance/:courseDistance', async (req, res) => {
    const { courseDistance } = req.params;
  
    const query = "SELECT * FROM Course WHERE Course.courseDistance=?;";
  
    try {
      const [rows] = await connection.query(query, courseDistance);
    
      if(!rows[0]) {
        return res.json({ msg: "Could not find course." });
      };
    
      res.json(rows)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    
  });

export default router;