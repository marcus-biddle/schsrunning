import { query } from '../utility/database.js';

// Get all coach seasons
export const getAllCoachSeasons = async (req, res) => {
  try {
    const sql = 'SELECT * FROM CoachSeason';
    const coachSeasons = await query(sql);
    res.json(coachSeasons);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get coach season by ID
export const getCoachSeasonById = async (req, res) => {
  const { coachId, coachTypeId, year } = req.params;
  try {
    const sql = 'SELECT * FROM CoachSeason WHERE coachId = ? AND coachTypeId = ? AND year = ?';
    const coachSeason = await query(sql, [coachId, coachTypeId, year]);
    if (coachSeason.length === 0) {
      res.status(404).json({ error: 'Coach season not found' });
    } else {
      res.json(coachSeason[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new coach season
export const createCoachSeason = async (req, res) => {
  const { coachId, coachTypeId, year } = req.body;
  try {
    const sql = 'INSERT INTO CoachSeason (coachId, coachTypeId, year) VALUES (?, ?, ?)';
    await query(sql, [coachId, coachTypeId, year]);
    res.json({ message: 'Coach season created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a coach season
export const deleteCoachSeason = async (req, res) => {
  const { coachId, coachTypeId, year } = req.params;
  try {
    const sql = 'DELETE FROM CoachSeason WHERE coachId = ? AND coachTypeId = ? AND year = ?';
    await query(sql, [coachId, coachTypeId, year]);
    res.json({ message: 'Coach season deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
