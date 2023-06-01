import { query } from '../utility/database.js';

// Get all special achievements
export const getAllSpecialAchievements = async (req, res) => {
  try {
    const sql = 'SELECT * FROM SpecialAchievement';
    const specialAchievements = await query(sql);
    res.json(specialAchievements);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get special achievement by ID
export const getSpecialAchievementById = async (req, res) => {
  const { specialAchievementId } = req.params;
  try {
    const sql = 'SELECT * FROM SpecialAchievement WHERE specialAchievementId = ?';
    const specialAchievement = await query(sql, [specialAchievementId]);
    if (specialAchievement.length === 0) {
      res.status(404).json({ error: 'Special achievement not found' });
    } else {
      res.json(specialAchievement[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new special achievement
export const createSpecialAchievement = async (req, res) => {
  const { specialAchievementName } = req.body;
  try {
    const sql = 'INSERT INTO SpecialAchievement (specialAchievementName) VALUES (?)';
    await query(sql, [specialAchievementName]);
    res.json({ message: 'Special achievement created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a special achievement
export const deleteSpecialAchievement = async (req, res) => {
  const { specialAchievementId } = req.params;
  try {
    const sql = 'DELETE FROM SpecialAchievement WHERE specialAchievementId = ?';
    await query(sql, [specialAchievementId]);
    res.json({ message: 'Special achievement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
