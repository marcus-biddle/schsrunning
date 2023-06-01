import { query } from '../utility/database.js';

// Get all course types
export async function getAllCourseTypes(req, res) {
  try {
    const sql = 'SELECT * FROM CourseType';
    const courseTypes = await query(sql);
    res.json(courseTypes);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching course types.' });
  }
}

// Get course type by ID
export async function getCourseTypeById(req, res) {
  const { courseTypeId } = req.params;
  try {
    const sql = 'SELECT * FROM CourseType WHERE courseTypeId = ?';
    const courseType = await query(sql, [courseTypeId]);
    if (courseType.length === 0) {
      res.status(404).json({ error: 'Course type not found.' });
    } else {
      res.json(courseType[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the course type.' });
  }
}

// Create a new course type
export async function createCourseType(req, res) {
  const { courseType } = req.body;
  try {
    const sql = 'INSERT INTO CourseType (courseType) VALUES (?)';
    const result = await query(sql, [courseType]);
    const newCourseType = {
      courseTypeId: result.insertId,
      courseType,
    };
    res.status(201).json(newCourseType);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the course type.' });
  }
}

// Update a course type
export async function updateCourseType(req, res) {
  const { courseTypeId } = req.params;
  const { courseType } = req.body;
  try {
    const sql = 'UPDATE CourseType SET courseType = ? WHERE courseTypeId = ?';
    await query(sql, [courseType, courseTypeId]);
    res.json({ message: 'Course type updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the course type.' });
  }
}

// Delete a course type
export async function deleteCourseType(req, res) {
  const { courseTypeId } = req.params;
  try {
    const sql = 'DELETE FROM CourseType WHERE courseTypeId = ?';
    await query(sql, [courseTypeId]);
    res.json({ message: 'Course type deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the course type.' });
  }
}
