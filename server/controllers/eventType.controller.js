import { query } from '../utility/database.js';

// Get all event types
export const getAllEventTypes = async (req, res) => {
  try {
    const sql = 'SELECT * FROM EventType';
    const eventTypes = await query(sql);
    res.json(eventTypes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get event type by ID
export const getEventTypeById = async (req, res) => {
  const { eventTypeId } = req.params;
  try {
    const sql = 'SELECT * FROM EventType WHERE eventTypeId = ?';
    const eventType = await query(sql, [eventTypeId]);
    if (eventType.length === 0) {
      res.status(404).json({ error: 'Event type not found' });
    } else {
      res.json(eventType[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new event type
export const createEventType = async (req, res) => {
  const { eventType } = req.body;
  try {
    const sql = 'INSERT INTO EventType (eventType) VALUES (?)';
    await query(sql, [eventType]);
    res.json({ message: 'Event type created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update event type by ID
export const updateEventType = async (req, res) => {
  const { eventTypeId } = req.params;
  const { eventType } = req.body;
  try {
    const sql = 'UPDATE EventType SET eventType = ? WHERE eventTypeId = ?';
    await query(sql, [eventType, eventTypeId]);
    res.json({ message: 'Event type updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete event type by ID
export const deleteEventType = async (req, res) => {
  const { eventTypeId } = req.params;
  try {
    const sql = 'DELETE FROM EventType WHERE eventTypeId = ?';
    await query(sql, [eventTypeId]);
    res.json({ message: 'Event type deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
