import { query } from '../utility/database.js';

// Get all relay results
export const getAllRelayResults = async (req, res) => {
  try {
    const sql = 'SELECT * FROM RelayResult';
    const relayResults = await query(sql);
    res.json(relayResults);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get relay result by competitor IDs and event ID
export const getRelayResult = async (req, res) => {
  const { competitorId1, competitorId2, competitorId3, competitorId4, eventId } = req.params;
  try {
    const sql =
      'SELECT * FROM RelayResult WHERE competitorId1 = ? AND competitorId2 = ? AND competitorId3 = ? AND competitorId4 = ? AND eventId = ?';
    const relayResult = await query(sql, [competitorId1, competitorId2, competitorId3, competitorId4, eventId]);
    if (relayResult.length === 0) {
      res.status(404).json({ error: 'Relay result not found' });
    } else {
      res.json(relayResult[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new relay result
export const createRelayResult = async (req, res) => {
  const { competitorId1, competitorId2, competitorId3, competitorId4, eventId, time, raceTimeTypeId, year, squadId } =
    req.body;
  try {
    const sql =
      'INSERT INTO RelayResult (competitorId1, competitorId2, competitorId3, competitorId4, eventId, time, raceTimeTypeId, year, squadId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    await query(sql, [competitorId1, competitorId2, competitorId3, competitorId4, eventId, time, raceTimeTypeId, year, squadId]);
    res.json({ message: 'Relay result created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update relay result by competitor IDs and event ID
export const updateRelayResult = async (req, res) => {
  const { competitorId1, competitorId2, competitorId3, competitorId4, eventId } = req.params;
  const { time, raceTimeTypeId, year, squadId } = req.body;
  try {
    const sql =
      'UPDATE RelayResult SET time = ?, raceTimeTypeId = ?, year = ?, squadId = ? WHERE competitorId1 = ? AND competitorId2 = ? AND competitorId3 = ? AND competitorId4 = ? AND eventId = ?';
    await query(sql, [time, raceTimeTypeId, year, squadId, competitorId1, competitorId2, competitorId3, competitorId4, eventId]);
    res.json({ message: 'Relay result updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete relay result by competitor IDs and event ID
export const deleteRelayResult = async (req, res) => {
  const { competitorId1, competitorId2, competitorId3, competitorId4, eventId } = req.params;
  try {
    const sql =
      'DELETE FROM RelayResult WHERE competitorId1 = ? AND competitorId2 = ? AND competitorId3 = ? AND competitorId4 = ? AND eventId = ?';
    await query(sql, [competitorId1, competitorId2, competitorId3, competitorId4, eventId]);
    res.json({ message: 'Relay result deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
