import { query } from '../utility/database.js';

// Get all awardees
export const getAllAwardees = async (req, res) => {
  try {
    const sql = 'SELECT * FROM Awardee';
    const awardees = await query(sql);
    res.json(awardees);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get awardee by athlete ID, award ID, squad ID, and year
export const getAwardee = async (req, res) => {
  const { athleteId, awardId, squadId, year } = req.params;
  try {
    const sql = 'SELECT * FROM Awardee WHERE athleteId = ? AND awardId = ? AND squadId = ? AND year = ?';
    const awardee = await query(sql, [athleteId, awardId, squadId, year]);
    if (awardee.length === 0) {
      res.status(404).json({ error: 'Awardee not found' });
    } else {
      res.json(awardee[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new awardee
export const createAwardee = async (req, res) => {
  const { athleteId, awardId, squadId, year, sportId } = req.body;
  try {
    const sql = 'INSERT INTO Awardee (athleteId, awardId, squadId, year, sportId) VALUES (?, ?, ?, ?, ?)';
    await query(sql, [athleteId, awardId, squadId, year, sportId]);
    res.json({ message: 'Awardee created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete an awardee
export const deleteAwardee = async (req, res) => {
  const { athleteId, awardId, squadId, year } = req.params;
  try {
    const sql = 'DELETE FROM Awardee WHERE athleteId = ? AND awardId = ? AND squadId = ? AND year = ?';
    await query(sql, [athleteId, awardId, squadId, year]);
    res.json({ message: 'Awardee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
