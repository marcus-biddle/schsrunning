import { query } from '../utility/database.js';

// Get all locations
export const getAllLocations = async (req, res) => {
  try {
    const sql = 'SELECT * FROM Location';
    const locations = await query(sql);
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get location by ID
export const getLocationById = async (req, res) => {
  const { locationId } = req.params;
  try {
    const sql = 'SELECT * FROM Location WHERE locationId = ?';
    const location = await query(sql, [locationId]);
    if (location.length === 0) {
      res.status(404).json({ error: 'Location not found' });
    } else {
      res.json(location[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new location
export const createLocation = async (req, res) => {
  const { stateId, city } = req.body;
  try {
    const sql = 'INSERT INTO Location (stateId, city) VALUES (?, ?)';
    const result = await query(sql, [stateId, city]);
    const locationId = result.insertId;
    res.json({ locationId });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a location
export const updateLocation = async (req, res) => {
  const { locationId } = req.params;
  const { stateId, city } = req.body;
  try {
    const sql = 'UPDATE Location SET stateId = ?, city = ? WHERE locationId = ?';
    await query(sql, [stateId, city, locationId]);
    res.json({ message: 'Location updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a location
export const deleteLocation = async (req, res) => {
  const { locationId } = req.params;
  try {
    const sql = 'DELETE FROM Location WHERE locationId = ?';
    await query(sql, [locationId]);
    res.json({ message: 'Location deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
