import { query } from '../utility/database.js';

// Get all sports
export const getAllSports = async (req, res) => {
  try {
    const sql = 'SELECT * FROM Sport';
    const sports = await query(sql);
    res.json(sports);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get sport by ID
export const getSportById = async (req, res) => {
  const { sportId } = req.params;
  try {
    const sql = 'SELECT * FROM Sport WHERE sportId = ?';
    const sport = await query(sql, [sportId]);
    if (sport.length === 0) {
      res.status(404).json({ error: 'Sport not found' });
    } else {
      res.json(sport[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new sport
export const createSport = async (req, res) => {
  const { sportName } = req.body;
  try {
    const sql = 'INSERT INTO Sport (sportName) VALUES (?)';
    await query(sql, [sportName]);
    res.json({ message: 'Sport created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a sport
export const deleteSport = async (req, res) => {
  const { sportId } = req.params;
  try {
    const sql = 'DELETE FROM Sport WHERE sportId = ?';
    await query(sql, [sportId]);
    res.json({ message: 'Sport deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
