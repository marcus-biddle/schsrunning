export const getAllCompetitorsHandler = async (req, res) => {

    const query = "SELECT DISTINCT * FROM Competitor;";
    const [rows] = await connection.query(query, []);
    
    if (!rows[0]) {
      return res.json({ msg: "Could not find competitors." });
    }
  
    res.send(rows);
  }

export const getCompetitorByIdHandler = async (req, res) => {
    const { competitorId } = req.params;
  
    const query = "SELECT * FROM Competitor WHERE Competitor.competitorId=?;";
    const [rows] = await connection.query(query, competitorId);
    
    if(!rows[0]) {
      return res.json({ msg: "Could not find competitor.", competitor: competitorId });
    };
  
    res.json(rows)
  }

export const getCompetitorByYearIdHandler = async (req, res) => {
    const { yearId } = req.params;
    const query = "SELECT * FROM Competitor WHERE Competitor.year = ?";
    const [rows] = await connection.query(query, [yearId]);
  
    if(!rows[0]) {
      return res.json({ msg: "Could not find competitors." });
    };
  
    res.send(rows);
  }

export const getCompetitorByRaceIdHandler = async (req, res) => {
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
  }

export const createNewCompetitorHandler = async (req, res) => {
  const { competitorId, athleteId, year, grade } = req.body;

  const query = "INSERT INTO Competitor (competitorId, athleteId, year, grade) VALUES (?, ?, ?, ?);";
  const values = [competitorId, athleteId, year, grade];

  try {
    await connection.query(query, values);
    const insertedCompetitor = {
      competitorId,
      athleteId,
      year,
      grade
    };
    return res.json({ msg: "Competitor added successfully.", competitor: insertedCompetitor });
  } catch (error) {
    console.log('Error adding competitor:', error);
    return res.status(500).json({ error: "Failed to add competitor." });
  }
}