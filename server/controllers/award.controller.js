import { query } from '../utility/database.js';

// Get all awards
export const getAllAwards = async (req, res) => {
  try {
    const sql = 'SELECT * FROM Award';
    const awards = await query(sql);
    res.json(awards);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get award by ID
export const getAwardById = async (req, res) => {
  const { awardId } = req.params;
  try {
    const sql = 'SELECT * FROM Award WHERE awardId = ?';
    const award = await query(sql, [awardId]);
    if (award.length === 0) {
      res.status(404).json({ error: 'Award not found' });
    } else {
      res.json(award[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new award
export const createAward = async (req, res) => {
  const { awardName, awardShortName } = req.body;
  try {
    const sql = 'INSERT INTO Award (awardName, awardShortName) VALUES (?, ?)';
    await query(sql, [awardName, awardShortName]);
    res.json({ message: 'Award created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete an award
export const deleteAward = async (req, res) => {
  const { awardId } = req.params;
  try {
    const sql = 'DELETE FROM Award WHERE awardId = ?';
    await query(sql, [awardId]);
    res.json({ message: 'Award deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
