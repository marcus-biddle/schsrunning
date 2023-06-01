import { query } from '../utility/database.js';

// Get all athletes
export const getAllAthletes = async (req, res) => {
  try {
    const athletes = await query('SELECT * FROM Athlete');
    res.json(athletes);
  } catch (error) {
    console.error('Error fetching athletes:', error);
    res.status(500).json({ error: 'Failed to fetch athletes' });
  }
};

// Get athlete by ID
export const getAthleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const athlete = await query('SELECT * FROM Athlete WHERE athleteId = ?', [id]);
    if (athlete.length === 0) {
      res.status(404).json({ error: 'Athlete not found' });
    } else {
      res.json(athlete[0]);
    }
  } catch (error) {
    console.error(`Error fetching athlete with ID ${id}:`, error);
    res.status(500).json({ error: 'Failed to fetch athlete' });
  }
};

// Create a new athlete
export const createAthlete = async (req, res) => {
  const { firstName, lastName, startHsYear, endHsYear, genderId, confidentHsYear } = req.body;
  try {
    const result = await query(
      'INSERT INTO Athlete (firstName, lastName, startHsYear, endHsYear, genderId, confidentHsYear) VALUES (?, ?, ?, ?, ?, ?)',
      [firstName, lastName, startHsYear, endHsYear, genderId, confidentHsYear]
    );
    const createdAthleteId = result.insertId;
    res.status(201).json({ id: createdAthleteId });
  } catch (error) {
    console.error('Error creating athlete:', error);
    res.status(500).json({ error: 'Failed to create athlete' });
  }
};

// Update athlete by ID
export const updateAthlete = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, startHsYear, endHsYear, genderId, confidentHsYear } = req.body;
  try {
    const result = await query(
      'UPDATE Athlete SET firstName = ?, lastName = ?, startHsYear = ?, endHsYear = ?, genderId = ?, confidentHsYear = ? WHERE athleteId = ?',
      [firstName, lastName, startHsYear, endHsYear, genderId, confidentHsYear, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Athlete not found' });
    } else {
      res.status(200).json({ message: 'Athlete updated successfully' });
    }
  } catch (error) {
    console.error(`Error updating athlete with ID ${id}:`, error);
    res.status(500).json({ error: 'Failed to update athlete' });
  }
};

// Delete athlete by ID
export const deleteAthlete = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('DELETE FROM Athlete WHERE athleteId = ?', [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Athlete not found' });
    } else {
      res.status(200).json({ message: 'Athlete deleted successfully' });
    }
  } catch (error) {
    console.error(`Error deleting athlete with ID ${id}:`, error);
    res.status(500).json({ error: 'Failed to delete athlete' });
  }
};
