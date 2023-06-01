import { query } from '../utility/database.js';

// Get all genders
export async function getAllGenders(req, res) {
  try {
    const sql = 'SELECT * FROM Gender';
    const genders = await query(sql);
    res.json(genders);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching genders.' });
  }
}

// Get gender by ID
export async function getGenderById(req, res) {
  const { genderId } = req.params;
  try {
    const sql = 'SELECT * FROM Gender WHERE genderId = ?';
    const gender = await query(sql, [genderId]);
    if (gender.length === 0) {
      res.status(404).json({ error: 'Gender not found.' });
    } else {
      res.json(gender[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the gender.' });
  }
}