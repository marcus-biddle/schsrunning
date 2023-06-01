import { query } from '../utility/database.js';

// Get all coach types
export const getAllCoachTypes = async (req, res) => {
  try {
    const sql = 'SELECT * FROM CoachType';
    const coachTypes = await query(sql);
    res.json(coachTypes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get coach type by ID
export const getCoachTypeById = async (req, res) => {
  const { coachTypeId } = req.params;
  try {
    const sql = 'SELECT * FROM CoachType WHERE coachTypeId = ?';
    const coachType = await query(sql, [coachTypeId]);
    if (coachType.length === 0) {
      res.status(404).json({ error: 'Coach type not found' });
    } else {
      res.json(coachType[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new coach type
export const createCoachType = async (req, res) => {
  const { coachType } = req.body;
  try {
    const sql = 'INSERT INTO CoachType (coachType) VALUES (?)';
    await query(sql, [coachType]);
    res.json({ message: 'Coach type created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a coach type
export const updateCoachType = async (req, res) => {
  const { coachTypeId } = req.params;
  const { coachType } = req.body;
  try {
    const sql = 'UPDATE CoachType SET coachType = ? WHERE coachTypeId = ?';
    await query(sql, [coachType, coachTypeId]);
    res.json({ message: 'Coach type updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a coach type
export const deleteCoachType = async (req, res) => {
  const { coachTypeId } = req.params;
  try {
    const sql = 'DELETE FROM CoachType WHERE coachTypeId = ?';
    await query(sql, [coachTypeId]);
    res.json({ message: 'Coach type deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
