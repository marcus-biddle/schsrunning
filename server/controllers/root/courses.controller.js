export const getAllCoursesHandler = async (req, res) => {
    const query = "SELECT * FROM Course";
    const [rows] = await connection.query(query);
    res.send(rows)
  }

export const getCourseByIdHandler = async (req, res) => {
    const { courseId } = req.params;
  
    const query = "SELECT * FROM Course WHERE Course.courseId=?;";
  
    try {
      const [rows] = await connection.query(query, courseId);
    
      if(!rows[0]) {
        return res.json({ msg: "Could not find course." });
      };
    
      res.json(rows[0])
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getCourseByDistanceHandler = async (req, res) => {
    const { courseDistance } = req.params;
  
    const query = "SELECT * FROM Course WHERE Course.courseDistance=?;";
  
    try {
      const [rows] = await connection.query(query, courseDistance);
    
      if(!rows[0]) {
        return res.json({ msg: "Could not find course." });
      };
    
      res.json(rows)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    
  }

export const getCourseByRaceIdHandler = async (req, res) => {
    const { raceNameId } = req.params;
  
    const query =`
    SELECT DISTINCT raceId, raceNameId, r.courseId, date, courseName, courseDistance
    FROM Race r
    INNER JOIN Course c ON r.courseId = c.courseId
    WHERE r.raceNameId = ?;`;
    const [rows] = await connection.query(query, [raceNameId]);
    
    if(!rows[0]) {
      return res.json({ msg: "Could not find race." });
    };
  
    res.json(rows)
  }