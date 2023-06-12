import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// File contains all the GETs for the database

// Load environment variables from .env file
dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const PORT = process.env.PORT || 3000;

// PROCEDURES
  // Get top XC Athletes
  app.get('/best-times', async (req, res) => {
    const inputCourseId = req.query.courseId;
    const inputGenderId = req.query.genderId;
    const limit = parseInt(req.query.limit);

    const query = `
      SELECT DISTINCT A.firstName, A.lastName, R.time, R.pace, C.year, C.grade, C.competitorId
      FROM Result AS R
      JOIN Competitor AS C ON R.competitorId = C.competitorId
      JOIN Athlete AS A ON C.athleteId = A.athleteId
      JOIN Gender AS G ON A.genderId = G.genderId
      JOIN Race AS RC ON R.raceId = RC.raceId
      JOIN (
          SELECT C.athleteId, MIN(R.time) AS bestTime
          FROM Result AS R
          JOIN Competitor AS C ON R.competitorId = C.competitorId
          JOIN Athlete AS A ON C.athleteId = A.athleteId
          JOIN Gender AS G ON A.genderId = G.genderId
          JOIN Race AS RC ON R.raceId = RC.raceId
          JOIN Course AS CO ON RC.courseId = CO.courseId
          WHERE CO.courseId = ? AND G.genderId = ? AND C.grade != 0
          GROUP BY C.athleteId
      ) AS BT ON C.athleteId = BT.athleteId AND R.time = BT.bestTime
      JOIN Course AS CO ON RC.courseId = CO.courseId
      WHERE CO.courseId = ? AND G.genderId = ? AND YEAR(RC.date) = C.year
      ORDER BY R.time
      LIMIT ?;`;

      try {
        const [rows] = await connection.query(query, [inputCourseId, inputGenderId, inputCourseId, inputGenderId, limit]);
        res.json(rows);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  });

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

// Award
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
  const { coachIds } = req.query;

  // Convert comma-separated string of coach IDs to an array
  const coachIdArray = coachIds.split(',').map(Number);

  // Prepare the MySQL query with placeholders for the coach IDs
  const query = "SELECT * FROM CoachSeason WHERE CoachSeason.coachId IN (?)";

  try {
    // Execute the query with the coach IDs array as a parameter
    const [rows] = await connection.query(query, [coachIdArray]);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching coach seasons:", error);
    res.status(500).json({ error: "Failed to fetch coach seasons" });
  }
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
    return res.json({ msg: "Could not find coach type." });
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
    return res.json({ msg: "Could not find competitor." });
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
    return res.json({ msg: "Could not find course." });
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
    return res.json({ msg: "Could not find course type." });
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
    return res.json({ msg: "Could not find event." });
  };

  res.json(rows[0])
});

// Event Sub Type
app.get('/event-subtypes', async (req, res) => {
  const query = "SELECT * FROM EventSubType";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/event-subtypes/:eventSubTypeId', async (req, res) => {
  const { eventSubTypeId } = req.params;

  const query = "SELECT * FROM EventSubType WHERE EventSubType.eventSubTypeId=?;";
  const [rows] = await connection.query(query, eventSubTypeId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find event subtype." });
  };

  res.json(rows[0])
});

// Event Type
app.get('/event-types', async (req, res) => {
  const query = "SELECT * FROM EventType";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/event-types/:eventTypeId', async (req, res) => {
  const { eventTypeId } = req.params;

  const query = "SELECT * FROM EventType WHERE EventType.eventTypeId=?;";
  const [rows] = await connection.query(query, eventTypeId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find event type." });
  };

  res.json(rows[0])
});

// Field Result
app.get('/field-results', async (req, res) => {
  const query = "SELECT * FROM FieldResult";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/field-results/:competitorId', async (req, res) => {
  const { competitorId } = req.params;

  const query = "SELECT * FROM FieldResult WHERE FieldResult.competitorId=?;";
  const [rows] = await connection.query(query, competitorId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find field result." });
  };

  res.json(rows)
});

// Gender
// Skipping this one, might be unneeded to GET

// Location
app.get('/locations', async (req, res) => {
  const query = "SELECT * FROM Location";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/locations/:locationId', async (req, res) => {
  const { locationId } = req.params;

  const query = "SELECT * FROM Location WHERE Location.locationId=?;";
  const [rows] = await connection.query(query, locationId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find location." });
  };

  res.json(rows[0])
});

// Race
app.get('/races', async (req, res) => {
  const query = "SELECT * FROM Race";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/races/:raceId', async (req, res) => {
  const { raceId } = req.params;

  const query = "SELECT * FROM Race WHERE Race.raceId=?;";
  const [rows] = await connection.query(query, raceId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find race." });
  };

  res.json(rows[0])
});

// Race Condition
// skipping for now

// Race Name
app.get('/race-names', async (req, res) => {
  const query = "SELECT * FROM RaceName";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/race-names/:raceNameId', async (req, res) => {
  const { raceNameId } = req.params;

  const query = "SELECT * FROM RaceName WHERE RaceName.raceNameId=?;";
  const [rows] = await connection.query(query, raceNameId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find race name." });
  };

  res.json(rows[0])
});

// Race Result
app.get('/race-results', async (req, res) => {
  const query = "SELECT * FROM RaceResult";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/race-results/:competitorId', async (req, res) => {
  const { competitorId } = req.params;

  const query = "SELECT * FROM RaceResult WHERE RaceResult.competitorId=?;";
  const [rows] = await connection.query(query, competitorId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find race result." });
  };

  res.json(rows)
});

// Race Time Type
app.get('/race-time-types', async (req, res) => {
  const query = "SELECT * FROM RaceTimeType";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/race-time-types/:raceTimeTypeId', async (req, res) => {
  const { raceTimeTypeId } = req.params;

  const query = "SELECT * FROM RaceTimeType WHERE RaceTimeType.raceTimeTypeId=?;";
  const [rows] = await connection.query(query, raceTimeTypeId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find race time." });
  };

  res.json(rows[0])
});

// Relay Result
app.get('/relay-results', async (req, res) => {
  const query = "SELECT * FROM RelayResult";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/relay-results/:eventId', async (req, res) => {
  const { eventId } = req.params;

  const query = "SELECT * FROM RelayResult WHERE RelayResult.eventId=?;";
  const [rows] = await connection.query(query, eventId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find relay result." });
  };

  res.json(rows)
});

// Results
app.get('/results', async (req, res) => {
  const query = "SELECT * FROM Result";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/results/:competitorId', async (req, res) => {
  const { competitorId } = req.params;

  const query = "SELECT * FROM Result WHERE Result.competitorId=?;";
  const [rows] = await connection.query(query, competitorId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find result." });
  };

  res.json(rows)
});

// Special Achievements
app.get('/special-achievements', async (req, res) => {
  const query = "SELECT * FROM SpecialAchievement";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/special-achievements/:specialAchievementId', async (req, res) => {
  const { specialAchievementId } = req.params;

  const query = "SELECT * FROM SpecialAchievement WHERE SpecialAchievement.specialAchievementId=?;";
  const [rows] = await connection.query(query, specialAchievementId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find achievement." });
  };

  res.json(rows)
});

// Special Achiever
app.get('/special-achievers', async (req, res) => {
  const query = "SELECT * FROM SpecialAchiever";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/special-achievers/:competitorId', async (req, res) => {
  const { competitorId } = req.params;

  const query = "SELECT * FROM SpecialAchiever WHERE SpecialAchiever.competitorId=?;";
  const [rows] = await connection.query(query, competitorId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find achiever." });
  };

  res.json(rows)
});

// Sport 
app.get('/sports', async (req, res) => {
  const query = "SELECT * FROM Sport";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/sports/:sportId', async (req, res) => {
  const { sportId } = req.params;

  const query = "SELECT * FROM Sport WHERE Sport.sportId=?;";
  const [rows] = await connection.query(query, sportId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find sport." });
  };

  res.json(rows)
});

// Squad
app.get('/squads', async (req, res) => {
  const query = "SELECT * FROM Squad";
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/squads/:squadId', async (req, res) => {
  const { squadId } = req.params;

  const query = "SELECT * FROM Squad WHERE Squad.squadId=?;";
  const [rows] = await connection.query(query, squadId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find squad." });
  };

  res.json(rows)
});

// State
// skipping

app.get('/', (req, res) => {
  res.json({ msg: 'Hello World' })
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// await connection.end();
