import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// File contains all the GETs for the database

// Load environment variables from .env file
dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
  } else {
    console.log('Connected to the database');
  }
});

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const PORT = process.env.PORT || 3000;


// PROCEDURES
  // Get XC Runner Results
  app.get('/xc-runner', async (req, res) => {
    const inputAthleteId = req.query.athleteId;
    const competitorIds = req.query.competitorIds.split(',');
    const raceId = req.query.raceId;
  
    const query = `
    SELECT R.time, R.pace, C.grade, RA.date, RN.racename, CO.coursename, CO.coursedistance,
    RC.racecondition, A.firstname, A.lastname, R.raceid, A.genderId, C.competitorId
    FROM Result R
    JOIN Competitor C ON R.competitorId = C.competitorId
    JOIN Athlete A ON C.athleteId = A.athleteId
    JOIN Race RA ON R.raceId = RA.raceId
    JOIN RaceName RN ON RA.raceNameId = RN.raceNameId
    JOIN RaceCondition RC ON RA.raceConditionId = RC.raceConditionId
    JOIN Course CO ON RA.courseId = CO.courseId
    WHERE (A.athleteId = ?)
    OR (R.raceId = ? 
      AND C.competitorId IN (?))
      AND YEAR(RA.date) = year
    ORDER BY RA.date DESC;
    `;
  
    try {
      const [rows] = await connection.query(query, [inputAthleteId, raceId, competitorIds]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Get top XC Athletes
  app.get('/best-times', async (req, res) => {
    const inputCourseId = req.query.courseId;
    const limit = parseInt(req.query.limit);

    const query = `
    SELECT DISTINCT A.firstName, A.lastName, A.genderId, R.time, R.pace, C.year, C.grade, C.competitorId, A.athleteId, CO.courseName, CO.courseDistance
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
        WHERE CO.courseId = ? AND C.grade != 0
        GROUP BY C.athleteId
    ) AS BT ON C.athleteId = BT.athleteId AND R.time = BT.bestTime
    JOIN Course AS CO ON RC.courseId = CO.courseId
    WHERE CO.courseId = ? AND YEAR(RC.date) = C.year
    ORDER BY R.time
    LIMIT ?;`;

      try {
        const [rows] = await connection.query(query, [inputCourseId, inputCourseId, limit]);
        res.json(rows);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  });

  // Get Top XC Teams
  app.get('/top-teams', async (req, res) => {
    const inputCourseId = req.query.courseId;
    const inputGenderId = req.query.genderId;

    const query = `
    SELECT
    yr AS 'year',
    MIN(team_time) AS 'team_time',
    MIN(team_avg) AS 'avg_ind_time',
    SUBSTRING_INDEX(GROUP_CONCAT(team_raceid ORDER BY team_time ASC SEPARATOR "#"), "#", 1) AS 'raceId',
    SUBSTRING_INDEX(GROUP_CONCAT(team_competitors ORDER BY team_time ASC SEPARATOR "#"), "#", 1) AS 'competitors'
FROM
    (
        SELECT
            YEAR(Race.date) AS yr,
            Result.raceid AS team_raceid,
            SEC_TO_TIME(AVG(TIME_TO_SEC(Result.time))) AS team_avg,
            SEC_TO_TIME(SUM(TIME_TO_SEC(Result.time))) AS team_time,
            GROUP_CONCAT(Result.competitorid ORDER BY Result.time ASC) AS team_competitors
        FROM
            Result
        JOIN
            Race ON Result.raceid = Race.raceid
        JOIN
            Competitor ON Result.competitorid = Competitor.competitorid
        JOIN
            Athlete ON Competitor.athleteid = Athlete.athleteid
        JOIN
            (
                SELECT
                    r.raceid,
                    GROUP_CONCAT(CONCAT(r.competitorid, ":", r.raceid) ORDER BY r.time ASC) AS finisher_key,
                    COUNT(DISTINCT r.competitorid) AS team_size
                FROM
                    Result r
                JOIN
                    Race ra ON r.raceid = ra.raceid
                JOIN
                    Competitor c ON r.competitorid = c.competitorid
                JOIN
                    Athlete a ON c.athleteid = a.athleteid
                WHERE
                    a.genderid = ?
                    AND YEAR(ra.date) = YEAR(ra.date)
                    AND ra.courseid = ?
                    AND r.raceid IN (
                        SELECT
                            ra.raceid
                        FROM
                            (
                                SELECT
                                    r.raceid,
                                    COUNT(r.raceid) AS num_racers
                                FROM
                                    Result r
                                JOIN
                                    Race ra ON r.raceid = ra.raceid
                                JOIN
                                    Competitor c ON r.competitorid = c.competitorid
                                JOIN
                                    Athlete a ON c.athleteid = a.athleteid
                                WHERE
                                    ra.courseid = ?
                                    AND a.genderid = ?
                                    AND YEAR(ra.date) = YEAR(ra.date)
                                GROUP BY
                                    r.raceid
                                HAVING
                                    num_racers >= 5
                            ) num_racers_table
                        WHERE
                            num_racers >= 5
                    )
                GROUP BY
                    r.raceid
                HAVING
                    team_size >= 5
            ) finisher_tbl
        ON
            Result.raceid = finisher_tbl.raceid
        WHERE
            FIND_IN_SET(CONCAT(Result.competitorid, ":", Result.raceid), finisher_tbl.finisher_key) BETWEEN 1 AND 5
        GROUP BY
            Result.raceid
        HAVING
            COUNT(Result.competitorid) = 5 -- Include this condition to filter rows with exactly 5 competitorIds
        ORDER BY
            yr, team_time
    ) team_times
GROUP BY
    yr
ORDER BY
    MIN(team_time)
LIMIT
    15;
`;

      try {
        const [rows] = await connection.query(query, [inputGenderId, inputCourseId, inputCourseId, inputGenderId]);
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

// Athlete Procedures
//     Get XC Runners
app.get('/xc-athletes/race', async (req, res) => {
  const { raceId } = req.query;
  const query = `
  SELECT DISTINCT Result.time, Result.pace, Competitor.grade, Race.date, RaceName.raceName, Course.courseName, Course.courseDistance,
       RaceCondition.raceCondition, Athlete.genderId, Athlete.firstName, Athlete.lastName, Athlete.athleteId, Competitor.competitorId
FROM Result
JOIN Competitor ON Result.competitorId = Competitor.competitorId
JOIN Athlete ON Competitor.athleteId = Athlete.athleteId
JOIN Race ON Result.raceId = Race.raceId
JOIN RaceName ON Race.raceNameId = RaceName.raceNameId
JOIN RaceCondition ON Race.raceConditionId = RaceCondition.raceConditionId
JOIN Course ON Race.courseId = Course.courseId
WHERE Race.raceId = ? AND Competitor.grade != 0
ORDER BY Result.time ASC;
  `;
  const [rows] = await connection.query(query, [raceId]);
  res.send(rows)
});

app.get('/xc-athletes/season', async (req, res) => {
  const { yearId } = req.query;

  const query = `SELECT DISTINCT A.firstName, A.lastName, C.grade, C.competitorId, A.athleteId, G.genderId
  FROM Result AS R
  JOIN Competitor AS C ON R.competitorId = C.competitorId
  JOIN Athlete AS A ON C.athleteId = A.athleteId
  JOIN Gender AS G ON A.genderId = G.genderId
  JOIN Race AS RC ON R.raceId = RC.raceId
  JOIN Course AS CO ON RC.courseId = CO.courseId
  WHERE YEAR(RC.date) = ? AND C.grade != 0
  ORDER BY A.athleteId;  
  `;

  try {
    const [rows] = await connection.query(query, [yearId]);
    res.send(rows);
  } catch (error) {
    console.error("Error fetching XC athletes:", error);
    res.status(500).json({ error: "Failed to fetch XC athletes" });
  }
});

//     Get XC Runners
app.get('/xc-athletes', async (req, res) => {
  const query = `SELECT DISTINCT a.athleteId, a.firstName, a.lastName, a.genderId
  FROM Athlete a
  JOIN Competitor c ON a.athleteId = c.athleteId
  JOIN Result re ON c.competitorId = re.competitorId
  JOIN Race r ON re.raceId = r.raceId;
  `;
  const [rows] = await connection.query(query);
  res.send(rows)
});

app.get('/xc-raceresults', async (req, res) => {
  const { yearId } = req.query;

  const query = `
  SELECT Result.time, Result.pace, Competitor.grade, Race.date, RaceName.raceName, Course.courseName, Course.courseDistance,
         RaceCondition.raceCondition, Athlete.firstName, Athlete.lastName, Competitor.competitorId, Race.raceId
  FROM Result
  JOIN Competitor ON Result.competitorId = Competitor.competitorId
  JOIN Athlete ON Competitor.athleteId = Athlete.athleteId
  JOIN Race ON Result.raceId = Race.raceId
  JOIN RaceName ON Race.raceNameId = RaceName.raceNameId
  JOIN RaceCondition ON Race.raceConditionId = RaceCondition.raceConditionId
  JOIN Course ON Race.courseId = Course.courseId
  WHERE YEAR(Race.date) = ?
  ORDER BY Result.time ASC;  
  `;

  try {
    const [rows] = await connection.query(query, [yearId]);
    res.send(rows);
  } catch (error) {
    console.error("Error fetching XC race results:", error);
    res.status(500).json({ error: "Failed to fetch XC race results" });
  }
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

app.get('/coach-seasons/:coachId', async (req, res) => {
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
app.get('/competitors/year/:yearId', async (req, res) => {
  const { yearId } = req.params;
  const query = "SELECT * FROM Competitor WHERE Competitor.year = ?";
  const [rows] = await connection.query(query, [yearId]);

  if(!rows[0]) {
    return res.json({ msg: "Could not find competitors." });
  };

  res.send(rows);
}); 


app.get('/competitors/:athleteId', async (req, res) => {
  const { athleteId } = req.params;

  const query = "SELECT * FROM Competitor Where Competitor.competitorId = ?;";
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

app.get('/results/:raceId', async (req, res) => {
  try {
    const { raceId } = req.params;
    const limit = parseInt(req.query.limit, 10);

    const query = "SELECT * FROM Result WHERE Result.raceId=? ORDER BY Result.time LIMIT ?;";
    const [rows] = await connection.query(query, [raceId, limit]);

    if (!rows[0]) {
      return res.json({ msg: "Could not find result." });
    }

    res.json(rows);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
