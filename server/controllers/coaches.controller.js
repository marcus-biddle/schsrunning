export const getAllCoachesHandler = async (req, res) => {
    const query = "SELECT * FROM Coach";
    const [rows] = await connection.query(query);
    res.json(rows)
};

export const getCoachByIdHandler = async (req, res) => {
    const { coachId } = req.params;
  
    const query = "SELECT * FROM Coach WHERE Coach.coachId=?;";
    const [rows] = await connection.query(query, coachId);
    
    if(!rows[0]) {
      return res.json({ msg: "Could not find coach." });
    };
  
    res.json(rows[0])
  }