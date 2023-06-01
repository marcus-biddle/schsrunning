import { query } from '../utility/database.js';

// Get all squads
export const getAllSquads = async (req, res) => {
  try {
    const sql = 'SELECT * FROM Squad';
    const squads = await query(sql);
    res.json(squads);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get squad by ID
export const getSquadById = async (req, res) => {
  const { squadId } = req.params;
  try {
    const sql = 'SELECT * FROM Squad WHERE squadId = ?';
    const squad = await query(sql, [squadId]);
    if (squad.length === 0) {
      res.status(404).json({ error: 'Squad not found' });
    } else {
      res.json(squad[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new squad
export const createSquad = async (req, res) => {
  const { squadName, squadAbbr } = req.body;
  try {
    const sql = 'INSERT INTO Squad (squadName, squadAbbr) VALUES (?, ?)';
    await query(sql, [squadName, squadAbbr]);
    res.json({ message: 'Squad created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a squad
export const deleteSquad = async (req, res) => {
  const { squadId } = req.params;
  try {
    const sql = 'DELETE FROM Squad WHERE squadId = ?';
    await query(sql, [squadId]);
    res.json({ message: 'Squad deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
