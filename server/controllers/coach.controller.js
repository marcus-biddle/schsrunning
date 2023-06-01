import { query } from '../utility/database.js';

// Get all coaches
export const getAllCoaches = async (req, res) => {
  try {
    const sql = 'SELECT * FROM Coach';
    const coaches = await query(sql);
    res.json(coaches);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get coach by ID
export const getCoachById = async (req, res) => {
  const { coachId } = req.params;
  try {
    const sql = 'SELECT * FROM Coach WHERE coachId = ?';
    const coach = await query(sql, [coachId]);
    if (coach.length === 0) {
      res.status(404).json({ error: 'Coach not found' });
    } else {
      res.json(coach[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new coach
export const createCoach = async (req, res) => {
  const { firstName, lastName, genderId } = req.body;
  try {
    const sql = 'INSERT INTO Coach (firstName, lastName, genderId) VALUES (?, ?, ?)';
    await query(sql, [firstName, lastName, genderId]);
    res.json({ message: 'Coach created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a coach
export const updateCoach = async (req, res) => {
  const { coachId } = req.params;
  const { firstName, lastName, genderId } = req.body;
  try {
    const sql = 'UPDATE Coach SET firstName = ?, lastName = ?, genderId = ? WHERE coachId = ?';
    await query(sql, [firstName, lastName, genderId, coachId]);
    res.json({ message: 'Coach updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a coach
export const deleteCoach = async (req, res) => {
  const { coachId } = req.params;
  try {
    const sql = 'DELETE FROM Coach WHERE coachId = ?';
    await query(sql, [coachId]);
    res.json({ message: 'Coach deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
