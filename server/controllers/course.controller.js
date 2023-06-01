import { query } from '../utility/database.js';

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const sql = 'SELECT * FROM Course';
    const courses = await query(sql);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get course by ID
export const getCourseById = async (req, res) => {
  const { courseId } = req.params;
  try {
    const sql = 'SELECT * FROM Course WHERE courseId = ?';
    const course = await query(sql, [courseId]);
    if (course.length === 0) {
      res.status(404).json({ error: 'Course not found' });
    } else {
      res.json(course[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new course
export const createCourse = async (req, res) => {
  const { courseName, courseDistance, locationId, courseTypeId } = req.body;
  try {
    const sql =
      'INSERT INTO Course (courseName, courseDistance, locationId, courseTypeId) VALUES (?, ?, ?, ?)';
    const result = await query(sql, [courseName, courseDistance, locationId, courseTypeId]);
    const courseId = result.insertId;
    res.json({ courseId });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  const { courseId } = req.params;
  const { courseName, courseDistance, locationId, courseTypeId } = req.body;
  try {
    const sql =
      'UPDATE Course SET courseName = ?, courseDistance = ?, locationId = ?, courseTypeId = ? WHERE courseId = ?';
    await query(sql, [courseName, courseDistance, locationId, courseTypeId, courseId]);
    res.json({ message: 'Course updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const sql = 'DELETE FROM Course WHERE courseId = ?';
    await query(sql, [courseId]);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
