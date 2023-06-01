import { query } from '../utility/database.js';

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const sql = 'SELECT * FROM Event';
    const events = await query(sql);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get event by ID
export const getEventById = async (req, res) => {
  const { eventId } = req.params;
  try {
    const sql = 'SELECT * FROM Event WHERE eventId = ?';
    const event = await query(sql, [eventId]);
    if (event.length === 0) {
      res.status(404).json({ error: 'Event not found' });
    } else {
      res.json(event[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new event
export const createEvent = async (req, res) => {
  const { event, eventSubTypeId } = req.body;
  try {
    const sql = 'INSERT INTO Event (event, eventSubTypeId) VALUES (?, ?)';
    await query(sql, [event, eventSubTypeId]);
    res.json({ message: 'Event created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update event by ID
export const updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const { event, eventSubTypeId } = req.body;
  try {
    const sql = 'UPDATE Event SET event = ?, eventSubTypeId = ? WHERE eventId = ?';
    await query(sql, [event, eventSubTypeId, eventId]);
    res.json({ message: 'Event updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete event by ID
export const deleteEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const sql = 'DELETE FROM Event WHERE eventId = ?';
    await query(sql, [eventId]);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
