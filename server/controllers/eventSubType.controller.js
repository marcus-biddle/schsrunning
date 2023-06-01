import { query } from '../utility/database.js';

// Get all event subtypes
export const getAllEventSubTypes = async (req, res) => {
  try {
    const sql = 'SELECT * FROM EventSubType';
    const eventSubTypes = await query(sql);
    res.json(eventSubTypes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get event subtype by ID
export const getEventSubTypeById = async (req, res) => {
  const { eventSubTypeId } = req.params;
  try {
    const sql = 'SELECT * FROM EventSubType WHERE eventSubTypeId = ?';
    const eventSubType = await query(sql, [eventSubTypeId]);
    if (eventSubType.length === 0) {
      res.status(404).json({ error: 'Event subtype not found' });
    } else {
      res.json(eventSubType[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new event subtype
export const createEventSubType = async (req, res) => {
  const { eventSubType, eventTypeId } = req.body;
  try {
    const sql = 'INSERT INTO EventSubType (eventSubType, eventTypeId) VALUES (?, ?)';
    await query(sql, [eventSubType, eventTypeId]);
    res.json({ message: 'Event subtype created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update event subtype by ID
export const updateEventSubType = async (req, res) => {
  const { eventSubTypeId } = req.params;
  const { eventSubType, eventTypeId } = req.body;
  try {
    const sql = 'UPDATE EventSubType SET eventSubType = ?, eventTypeId = ? WHERE eventSubTypeId = ?';
    await query(sql, [eventSubType, eventTypeId, eventSubTypeId]);
    res.json({ message: 'Event subtype updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete event subtype by ID
export const deleteEventSubType = async (req, res) => {
  const { eventSubTypeId } = req.params;
  try {
    const sql = 'DELETE FROM EventSubType WHERE eventSubTypeId = ?';
    await query(sql, [eventSubTypeId]);
    res.json({ message: 'Event subtype deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
