import { query } from '../utility/database.js';

// Get all race conditions
export const getAllRaceConditions = async (req, res) => {
  try {
    const sql = 'SELECT * FROM RaceCondition';
    const raceConditions = await query(sql);
    res.json(raceConditions);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get race condition by ID
export const getRaceConditionById = async (req, res) => {
  const { raceConditionId } = req.params;
  try {
    const sql = 'SELECT * FROM RaceCondition WHERE raceConditionId = ?';
    const raceCondition = await query(sql, [raceConditionId]);
    if (raceCondition.length === 0) {
      res.status(404).json({ error: 'Race condition not found' });
    } else {
      res.json(raceCondition[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new race condition
export const createRaceCondition = async (req, res) => {
  const { raceCondition } = req.body;
  try {
    const sql = 'INSERT INTO RaceCondition (raceCondition) VALUES (?)';
    const result = await query(sql, [raceCondition]);
    const raceConditionId = result.insertId;
    res.json({ raceConditionId });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a race condition
export const updateRaceCondition = async (req, res) => {
  const { raceConditionId } = req.params;
  const { raceCondition } = req.body;
  try {
    const sql = 'UPDATE RaceCondition SET raceCondition = ? WHERE raceConditionId = ?';
    await query(sql, [raceCondition, raceConditionId]);
    res.json({ message: 'Race condition updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a race condition
export const deleteRaceCondition = async (req, res) => {
  const { raceConditionId } = req.params;
  try {
    const sql = 'DELETE FROM RaceCondition WHERE raceConditionId = ?';
    await query(sql, [raceConditionId]);
    res.json({ message: 'Race condition deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
