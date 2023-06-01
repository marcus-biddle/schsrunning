import { query } from '../utility/database.js';

// Controller function to get all competitors
async function getAllCompetitors(req, res) {
  try {
    const sql = 'SELECT * FROM Competitor';
    const competitors = await query(sql);
    res.json(competitors);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Controller function to create a new competitor
async function createCompetitor(req, res) {
  const { competitorId, athleteId, year, grade } = req.body;
  try {
    const sql = 'INSERT INTO Competitor (competitorId, athleteId, year, grade) VALUES (?, ?, ?, ?)';
    await query(sql, [competitorId, athleteId, year, grade]);
    res.status(201).json({ message: 'Competitor created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Controller function to update a competitor
async function updateCompetitor(req, res) {
  const { competitorId } = req.params;
  const { grade } = req.body;
  try {
    const sql = 'UPDATE Competitor SET grade = ? WHERE competitorId = ?';
    await query(sql, [grade, competitorId]);
    res.json({ message: 'Competitor updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Controller function to delete a competitor
async function deleteCompetitor(req, res) {
  const { competitorId } = req.params;
  try {
    const sql = 'DELETE FROM Competitor WHERE competitorId = ?';
    await query(sql, [competitorId]);
    res.json({ message: 'Competitor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export { getAllCompetitors, createCompetitor, updateCompetitor, deleteCompetitor };
