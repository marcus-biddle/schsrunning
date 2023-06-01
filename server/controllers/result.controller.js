import { query } from '../utility/database.js';

// Get all results
export const getAllResults = async (req, res) => {
  try {
    const sql = 'SELECT * FROM Result';
    const results = await query(sql);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get result by competitor and race ID
export const getResultByCompetitorAndRaceId = async (req, res) => {
  const { competitorId, raceId } = req.params;
  try {
    const sql = 'SELECT * FROM Result WHERE competitorId = ? AND raceId = ?';
    const result = await query(sql, [competitorId, raceId]);
    if (result.length === 0) {
      res.status(404).json({ error: 'Result not found' });
    } else {
      res.json(result[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new result
export const createResult = async (req, res) => {
  const { competitorId, raceId, time, pace } = req.body;
  try {
    const sql = 'INSERT INTO Result (competitorId, raceId, time, pace) VALUES (?, ?, ?, ?)';
    await query(sql, [competitorId, raceId, time, pace]);
    res.json({ message: 'Result created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a result
export const updateResult = async (req, res) => {
  const { competitorId, raceId } = req.params;
  const { time, pace } = req.body;
  try {
    const sql = 'UPDATE Result SET time = ?, pace = ? WHERE competitorId = ? AND raceId = ?';
    await query(sql, [time, pace, competitorId, raceId]);
    res.json({ message: 'Result updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a result
export const deleteResult = async (req, res) => {
  const { competitorId, raceId } = req.params;
  try {
    const sql = 'DELETE FROM Result WHERE competitorId = ? AND raceId = ?';
    await query(sql, [competitorId, raceId]);
    res.json({ message: 'Result deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
