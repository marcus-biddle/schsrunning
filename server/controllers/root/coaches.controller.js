import { connection } from "../../config/mysqlDbConn.js";

// export const getAllCoachesHandler = async (req, res) => {
//     const query = "SELECT * FROM Coach";
//     const [rows] = await connection.query(query);
//     res.json(rows)
// };

export const getCoachByIdHandler = async (req, res) => {
    const { coachId } = req.params;
  
    const query = "SELECT * FROM Coach WHERE Coach.coachId=?;";
    const [rows] = await connection.query(query, coachId);
    
    if(!rows[0]) {
      return res.json({ msg: "Could not find coach." });
    };
  
    res.json(rows[0])
  }

export const getAllCoachesByYearHandler = async (req, res) => {
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
}

export const getAllCoachesHandler = async (req, res) => {
  const { coachId } = req.params;

  const query = `SELECT CoachSeason.*, Coach.*
  FROM CoachSeason
  JOIN Coach ON CoachSeason.coachId = Coach.coachId;
  `;
  const [rows] = await connection.query(query, coachId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find coach's seasons." });
  };

  res.json(rows)
}

export const getCoachTypeByCoachIdHandler = async (req, res) => {
  const { coachTypeId } = req.params;

  const query = "SELECT * FROM CoachType WHERE CoachType.coachTypeId=?;";
  const [rows] = await connection.query(query, coachTypeId);
  
  if(!rows[0]) {
    return res.json({ msg: "Could not find coach type." });
  };

  res.json(rows[0])
}