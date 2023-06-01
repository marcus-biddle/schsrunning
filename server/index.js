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

const app = express();
const PORT = process.env.PORT || 3000;

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Middleware to make MySQL connection pool available in request object
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// Parse JSON request bodies
app.use(express.json());

// Routes
app.use('/api', athletesRoutes);
app.use('/api', competitorRoutes);
app.use('/api', genderRoutes);
app.use('/api', courseTypeRoutes);
app.use('/api', stateRoutes);
app.use('/api', locationRoutes);
app.use('/api', raceConditionRoutes);
app.use('/api', raceNameRoutes);
app.use('/api', courseRoutes);
app.use('/api', raceRoutes);
app.use('/api', resultRoutes);
app.use('/api', coachRoutes);
app.use('/api', coachTypeRoutes);
app.use('/api', coachSeasonRoutes);
app.use('/api', squadRoutes);
app.use('/api', awardRoutes);
app.use('/api', sportRoutes);
app.use('/api', awardeeRoutes);
app.use('/api', specialAchievementRoutes);
app.use('/api', specialAchieverRoutes);
app.use('/api', eventTypeRoutes);
app.use('/api', eventSubTypeRoutes);
app.use('/api', eventRoutes);
app.use('/api', fieldResultRoutes);
app.use('/api', raceTimeTypeRoutes);
app.use('/api', raceResultRoutes);
app.use('/api', relayResultRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
