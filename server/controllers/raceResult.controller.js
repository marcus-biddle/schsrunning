import { query } from '../utility/database.js';

// Get all race results
export const getAllRaceResults = async (req, res) => {
  try {
    const sql = 'SELECT * FROM RaceResult';
    const raceResults = await query(sql);
    res.json(raceResults);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get race result by competitor ID and event ID
export const getRaceResult = async (req, res) => {
  const { competitorId, eventId } = req.params;
  try {
    const sql = 'SELECT * FROM RaceResult WHERE competitorId = ? AND eventId = ?';
    const raceResult = await query(sql, [competitorId, eventId]);
    if (raceResult.length === 0) {
      res.status(404).json({ error: 'Race result not found' });
    } else {
      res.json(raceResult[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new race result
export const createRaceResult = async (req, res) => {
  const { competitorId, eventId, time, raceTimeTypeId, year, squadId } = req.body;
  try {
    const sql =
      'INSERT INTO RaceResult (competitorId, eventId, time, raceTimeTypeId, year, squadId) VALUES (?, ?, ?, ?, ?, ?)';
    await query(sql, [competitorId, eventId, time, raceTimeTypeId, year, squadId]);
    res.json({ message: 'Race result created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update race result by competitor ID and event ID
export const updateRaceResult = async (req, res) => {
  const { competitorId, eventId } = req.params;
  const { time, raceTimeTypeId, year, squadId } = req.body;
  try {
    const sql =
      'UPDATE RaceResult SET time = ?, raceTimeTypeId = ?, year = ?, squadId = ? WHERE competitorId = ? AND eventId = ?';
    await query(sql, [time, raceTimeTypeId, year, squadId, competitorId, eventId]);
    res.json({ message: 'Race result updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete race result by competitor ID and event ID
export const deleteRaceResult = async (req, res) => {
  const { competitorId, eventId } = req.params;
  try {
    const sql = 'DELETE FROM RaceResult WHERE competitorId = ? AND eventId = ?';
    await query(sql, [competitorId, eventId]);
    res.json({ message: 'Race result deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
