import { query } from '../utility/database.js';

// Get all race names
export const getAllRaceNames = async (req, res) => {
  try {
    const sql = 'SELECT * FROM RaceName';
    const raceNames = await query(sql);
    res.json(raceNames);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get race name by ID
export const getRaceNameById = async (req, res) => {
  const { raceNameId } = req.params;
  try {
    const sql = 'SELECT * FROM RaceName WHERE raceNameId = ?';
    const raceName = await query(sql, [raceNameId]);
    if (raceName.length === 0) {
      res.status(404).json({ error: 'Race name not found' });
    } else {
      res.json(raceName[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new race name
export const createRaceName = async (req, res) => {
  const { raceName } = req.body;
  try {
    const sql = 'INSERT INTO RaceName (raceName) VALUES (?)';
    const result = await query(sql, [raceName]);
    const raceNameId = result.insertId;
    res.json({ raceNameId });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a race name
export const updateRaceName = async (req, res) => {
  const { raceNameId } = req.params;
  const { raceName } = req.body;
  try {
    const sql = 'UPDATE RaceName SET raceName = ? WHERE raceNameId = ?';
    await query(sql, [raceName, raceNameId]);
    res.json({ message: 'Race name updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a race name
export const deleteRaceName = async (req, res) => {
  const { raceNameId } = req.params;
  try {
    const sql = 'DELETE FROM RaceName WHERE raceNameId = ?';
    await query(sql, [raceNameId]);
    res.json({ message: 'Race name deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
