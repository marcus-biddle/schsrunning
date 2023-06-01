import { query } from '../utility/database.js';

// Get all field results
export const getAllFieldResults = async (req, res) => {
  try {
    const sql = 'SELECT * FROM FieldResult';
    const fieldResults = await query(sql);
    res.json(fieldResults);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get field result by competitor ID and event ID
export const getFieldResultByIds = async (req, res) => {
  const { competitorId, eventId } = req.params;
  try {
    const sql = 'SELECT * FROM FieldResult WHERE competitorId = ? AND eventId = ?';
    const fieldResult = await query(sql, [competitorId, eventId]);
    if (fieldResult.length === 0) {
      res.status(404).json({ error: 'Field result not found' });
    } else {
      res.json(fieldResult[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new field result
export const createFieldResult = async (req, res) => {
  const { competitorId, eventId, footPartOfDistance, inchPartOfDistance, year, squadId } = req.body;
  try {
    const sql = 'INSERT INTO FieldResult (competitorId, eventId, footPartOfDistance, inchPartOfDistance, year, squadId) VALUES (?, ?, ?, ?, ?, ?)';
    await query(sql, [competitorId, eventId, footPartOfDistance, inchPartOfDistance, year, squadId]);
    res.json({ message: 'Field result created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update field result by competitor ID and event ID
export const updateFieldResult = async (req, res) => {
  const { competitorId, eventId } = req.params;
  const { footPartOfDistance, inchPartOfDistance, year, squadId } = req.body;
  try {
    const sql = 'UPDATE FieldResult SET footPartOfDistance = ?, inchPartOfDistance = ?, year = ?, squadId = ? WHERE competitorId = ? AND eventId = ?';
    await query(sql, [footPartOfDistance, inchPartOfDistance, year, squadId, competitorId, eventId]);
    res.json({ message: 'Field result updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete field result by competitor ID and event ID
export const deleteFieldResult = async (req, res) => {
  const { competitorId, eventId } = req.params;
  try {
    const sql = 'DELETE FROM FieldResult WHERE competitorId = ? AND eventId = ?';
    await query(sql, [competitorId, eventId]);
    res.json({ message: 'Field result deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
