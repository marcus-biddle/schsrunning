import { query } from '../utility/database.js';

// Get all race time types
export const getAllRaceTimeTypes = async (req, res) => {
  try {
    const sql = 'SELECT * FROM RaceTimeType';
    const raceTimeTypes = await query(sql);
    res.json(raceTimeTypes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get race time type by ID
export const getRaceTimeTypeById = async (req, res) => {
  const { raceTimeTypeId } = req.params;
  try {
    const sql = 'SELECT * FROM RaceTimeType WHERE raceTimeTypeId = ?';
    const raceTimeType = await query(sql, [raceTimeTypeId]);
    if (raceTimeType.length === 0) {
      res.status(404).json({ error: 'Race time type not found' });
    } else {
      res.json(raceTimeType[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new race time type
export const createRaceTimeType = async (req, res) => {
  const { raceTimeTypeId, raceTimeType } = req.body;
  try {
    const sql = 'INSERT INTO RaceTimeType (raceTimeTypeId, raceTimeType) VALUES (?, ?)';
    await query(sql, [raceTimeTypeId, raceTimeType]);
    res.json({ message: 'Race time type created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update race time type by ID
export const updateRaceTimeType = async (req, res) => {
  const { raceTimeTypeId } = req.params;
  const { raceTimeType } = req.body;
  try {
    const sql = 'UPDATE RaceTimeType SET raceTimeType = ? WHERE raceTimeTypeId = ?';
    await query(sql, [raceTimeType, raceTimeTypeId]);
    res.json({ message: 'Race time type updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete race time type by ID
export const deleteRaceTimeType = async (req, res) => {
  const { raceTimeTypeId } = req.params;
  try {
    const sql = 'DELETE FROM RaceTimeType WHERE raceTimeTypeId = ?';
    await query(sql, [raceTimeTypeId]);
    res.json({ message: 'Race time type deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
