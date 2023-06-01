import { query } from '../utility/database.js';

// Get all states
export const getAllStates = async (req, res) => {
  try {
    const sql = 'SELECT * FROM State';
    const states = await query(sql);
    res.json(states);
  } catch (error) {
    console.error('Error retrieving states:', error);
    res.status(500).json({ error: 'Failed to retrieve states' });
  }
};

// Get state by ID
export const getStateById = async (req, res) => {
  const { stateId } = req.params;
  try {
    const sql = 'SELECT * FROM State WHERE stateId = ?';
    const state = await query(sql, [stateId]);
    if (state.length === 0) {
      res.status(404).json({ error: 'State not found' });
    } else {
      res.json(state[0]);
    }
  } catch (error) {
    console.error('Error retrieving state:', error);
    res.status(500).json({ error: 'Failed to retrieve state' });
  }
};

// Create a new state
export const createState = async (req, res) => {
  const { state } = req.body;
  try {
    const sql = 'INSERT INTO State (state) VALUES (?)';
    const result = await query(sql, [state]);
    const newStateId = result.insertId;
    res.status(201).json({ stateId: newStateId, state });
  } catch (error) {
    console.error('Error creating state:', error);
    res.status(500).json({ error: 'Failed to create state' });
  }
};

// Update a state
export const updateState = async (req, res) => {
  const { stateId } = req.params;
  const { state } = req.body;
  try {
    const sql = 'UPDATE State SET state = ? WHERE stateId = ?';
    await query(sql, [state, stateId]);
    res.json({ stateId, state });
  } catch (error) {
    console.error('Error updating state:', error);
    res.status(500).json({ error: 'Failed to update state' });
  }
};

// Delete a state
export const deleteState = async (req, res) => {
  const { stateId } = req.params;
  try {
    const sql = 'DELETE FROM State WHERE stateId = ?';
    await query(sql, [stateId]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting state:', error);
    res.status(500).json({ error: 'Failed to delete state' });
  }
};
