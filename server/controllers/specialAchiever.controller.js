import { query } from '../utility/database.js';

// Get all special achievers
export const getAllSpecialAchievers = async (req, res) => {
  try {
    const sql = 'SELECT * FROM SpecialAchiever';
    const specialAchievers = await query(sql);
    res.json(specialAchievers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get special achiever by competitor ID and special achievement ID
export const getSpecialAchiever = async (req, res) => {
  const { competitorId, specialAchievementId } = req.params;
  try {
    const sql = 'SELECT * FROM SpecialAchiever WHERE competitorId = ? AND specialAchievementId = ?';
    const specialAchiever = await query(sql, [competitorId, specialAchievementId]);
    if (specialAchiever.length === 0) {
      res.status(404).json({ error: 'Special achiever not found' });
    } else {
      res.json(specialAchiever[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new special achiever
export const createSpecialAchiever = async (req, res) => {
  const { competitorId, specialAchievementId, notes, sportId, year } = req.body;
  try {
    const sql = 'INSERT INTO SpecialAchiever (competitorId, specialAchievementId, notes, sportId, year) VALUES (?, ?, ?, ?, ?)';
    await query(sql, [competitorId, specialAchievementId, notes, sportId, year]);
    res.json({ message: 'Special achiever created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a special achiever
export const deleteSpecialAchiever = async (req, res) => {
  const { competitorId, specialAchievementId } = req.params;
  try {
    const sql = 'DELETE FROM SpecialAchiever WHERE competitorId = ? AND specialAchievementId = ?';
    await query(sql, [competitorId, specialAchievementId]);
    res.json({ message: 'Special achiever deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
