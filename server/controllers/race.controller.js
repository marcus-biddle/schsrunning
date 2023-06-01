import { query } from '../utility/database.js';

// Get all races
export const getAllRaces = async (req, res) => {
  try {
    const sql = 'SELECT * FROM Race';
    const races = await query(sql);
    res.json(races);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get race by ID
export const getRaceById = async (req, res) => {
  const { raceId } = req.params;
  try {
    const sql = 'SELECT * FROM Race WHERE raceId = ?';
    const race = await query(sql, [raceId]);
    if (race.length === 0) {
      res.status(404).json({ error: 'Race not found' });
    } else {
      res.json(race[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new race
export const createRace = async (req, res) => {
  const { raceNameId, raceConditionId, courseId, date } = req.body;
  try {
    const sql =
      'INSERT INTO Race (raceNameId, raceConditionId, courseId, date) VALUES (?, ?, ?, ?)';
    const result = await query(sql, [raceNameId, raceConditionId, courseId, date]);
    const raceId = result.insertId;
    res.json({ raceId });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a race
export const updateRace = async (req, res) => {
  const { raceId } = req.params;
  const { raceNameId, raceConditionId, courseId, date } = req.body;
  try {
    const sql =
      'UPDATE Race SET raceNameId = ?, raceConditionId = ?, courseId = ?, date = ? WHERE raceId = ?';
    await query(sql, [raceNameId, raceConditionId, courseId, date, raceId]);
    res.json({ message: 'Race updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a race
export const deleteRace = async (req, res) => {
  const { raceId } = req.params;
  try {
    const sql = 'DELETE FROM Race WHERE raceId = ?';
    await query(sql, [raceId]);
    res.json({ message: 'Race deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
