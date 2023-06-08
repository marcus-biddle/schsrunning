import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

import athletesRoutes from './routes/athlete.route.js';
import competitorRoutes from './routes/competitor.route.js';
import genderRoutes from './routes/gender.route.js';
import courseTypeRoutes from './routes/courseType.route.js';
import stateRoutes from './routes/state.route.js';
import locationRoutes from './routes/location.route.js';
import raceConditionRoutes from './routes/raceCondition.route.js';
import raceNameRoutes from './routes/raceName.route.js';
import courseRoutes from './routes/course.route.js';
import raceRoutes from './routes/race.route.js';
import resultRoutes from './routes/result.route.js';
import coachRoutes from './routes/coach.route.js';
import coachTypeRoutes from './routes/coachType.route.js';
import coachSeasonRoutes from './routes/coachSeason.route.js';
import squadRoutes from './routes/squad.route.js';
import awardRoutes from './routes/award.route.js';
import sportRoutes from './routes/sport.route.js';
import awardeeRoutes from './routes/awardee.route.js';
import specialAchievementRoutes from './routes/specialAchievement.route.js';
import specialAchieverRoutes from './routes/specialAchiever.route.js';
import eventTypeRoutes from './routes/eventType.route.js';
import eventSubTypeRoutes from './routes/eventSubType.route.js';
import eventRoutes from './routes/event.route.js';
import fieldResultRoutes from './routes/fieldResult.route.js';
import raceTimeTypeRoutes from './routes/raceTimeType.route.js';
import raceResultRoutes from './routes/raceResult.route.js';
import relayResultRoutes from './routes/relayResult.route.js';

// Load environment variables from .env file
dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const app = express();
const PORT = process.env.PORT || 3000;

// Create MySQL connection pool


// Middleware to make MySQL connection available in request object
// app.use((req, res, next) => {
//   req.socket = connection;
//   next();
// });

// // Parse JSON request bodies
// app.use(express.json());


// Athletes
app.get('/athletes', async (req, res) => {
  const query = "SELECT * FROM Athlete";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/athletes/:athleteId', async (req, res) => {
  const { athleteId } = req.params;

  const query = "SELECT * FROM Athlete WHERE Athlete.athleteId=?;";
  const [rows] = await connection.query(query, athleteId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find athlete." });
  };

  res.json(rows[0])
});

// Awards
app.get('/awards', async (req, res) => {
  const query = "SELECT * FROM Award";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/awards/:awardId', async (req, res) => {
  const { awardId } = req.params;

  const query = "SELECT * FROM Award WHERE Award.awardId=?;";
  const [rows] = await connection.query(query, awardId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find award." });
  };

  res.json(rows[0])
});

// Awardee
app.get('/awardees', async (req, res) => {
  const query = "SELECT * FROM Awardee";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/awardees/:athleteId', async (req, res) => {
  const { athleteId } = req.params;

  const query = "SELECT * FROM Awardee WHERE Awardee.athleteId=?;";
  const [rows] = await connection.query(query, athleteId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find awardee." });
  };

  res.json(rows)
});

// Coach
app.get('/coaches', async (req, res) => {
  const query = "SELECT * FROM Coach";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/coaches/:coachId', async (req, res) => {
  const { coachId } = req.params;

  const query = "SELECT * FROM Coach WHERE Coach.coachId=?;";
  const [rows] = await connection.query(query, coachId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find coach." });
  };

  res.json(rows[0])
});

// Coach Season
app.get('/coach-seasons', async (req, res) => {
  const query = "SELECT * FROM CoachSeason";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/coach-seasons/:coachId', async (req, res) => {
  const { coachId } = req.params;

  const query = "SELECT * FROM CoachSeason WHERE CoachSeason.coachId=?;";
  const [rows] = await connection.query(query, coachId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find coach's seasons." });
  };

  res.json(rows)
});

// Coach Type
app.get('/coach-types', async (req, res) => {
  const query = "SELECT * FROM CoachType";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/coach-types/:coachTypeId', async (req, res) => {
  const { coachTypeId } = req.params;

  const query = "SELECT * FROM CoachType WHERE CoachType.coachTypeId=?;";
  const [rows] = await connection.query(query, coachTypeId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find coach's seasons." });
  };

  res.json(rows[0])
});

// Competitor
app.get('/competitors', async (req, res) => {
  const query = "SELECT * FROM Competitor";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/competitors/:athleteId', async (req, res) => {
  const { athleteId } = req.params;

  const query = "SELECT * FROM Competitor WHERE Competitor.athleteId=?;";
  const [rows] = await connection.query(query, athleteId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find coach's seasons." });
  };

  res.json(rows)
});

// Course
app.get('/courses', async (req, res) => {
  const query = "SELECT * FROM Course";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/courses/:courseId', async (req, res) => {
  const { courseId } = req.params;

  const query = "SELECT * FROM Course WHERE Course.courseId=?;";
  const [rows] = await connection.query(query, courseId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find coach's seasons." });
  };

  res.json(rows)
});

// Course Type
app.get('/course-types', async (req, res) => {
  const query = "SELECT * FROM CourseType";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/course-types/:courseTypeId', async (req, res) => {
  const { courseTypeId } = req.params;

  const query = "SELECT * FROM CourseType WHERE CourseType.courseTypeId=?;";
  const [rows] = await connection.query(query, courseTypeId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find coach's seasons." });
  };

  res.json(rows)
});

// Event
app.get('/events', async (req, res) => {
  const query = "SELECT * FROM Event";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/events/:eventId', async (req, res) => {
  const { eventId } = req.params;

  const query = "SELECT * FROM Event WHERE Event.eventId=?;";
  const [rows] = await connection.query(query, eventId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find coach's seasons." });
  };

  res.json(rows[0])
});

// Event Sub Type

// app.use('/api', genderRoutes);
// app.use('/api', courseTypeRoutes);
// app.use('/api', stateRoutes);
// app.use('/api', locationRoutes);
// app.use('/api', raceConditionRoutes);
// app.use('/api', raceNameRoutes);
// app.use('/api', courseRoutes);
// app.use('/api', raceRoutes);
// app.use('/api', resultRoutes);
// app.use('/api', coachRoutes);
// app.use('/api', coachTypeRoutes);
// app.use('/api', coachSeasonRoutes);
// app.use('/api', squadRoutes);
// app.use('/api', awardRoutes);
// app.use('/api', sportRoutes);
// app.use('/api', awardeeRoutes);
// app.use('/api', specialAchievementRoutes);
// app.use('/api', specialAchieverRoutes);
// app.use('/api', eventTypeRoutes);
// app.use('/api', eventSubTypeRoutes);
// app.use('/api', eventRoutes);
// app.use('/api', fieldResultRoutes);
// app.use('/api', raceTimeTypeRoutes);
// app.use('/api', raceResultRoutes);
// app.use('/api', relayResultRoutes);

app.get('/', (req, res) => {
  res.json({ msg: 'Hello World' })
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// await connection.end();
