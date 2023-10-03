export const getAllAthletesHandler = async (req, res) => {
    const query = "SELECT * FROM Athlete;";
    try {
      const [rows] = await connection.query(query);
    
      if(!rows[0]) {
        return res.json({ msg: "Could not find athletes." });
      };
    
      res.json(rows)
    } catch (err) {
      console.error(err);
    }
    
  }

export const getAthleteByAthleteIdHandler = async (req, res) => {
    const { athleteId } = req.params;
  
    const query = "SELECT * FROM Athlete WHERE Athlete.athleteId=?;";
    const [rows] = await connection.query(query, athleteId);
    
    if(!rows[0]) {
      return res.json({ msg: "Could not find athlete." });
    };
  
    res.json(rows[0])
  }

export const createNewAthleteHandler = async (req, res) => {
    const { firstName, lastName, startHsYear, endHsYear, genderId, confidentHsYear } = req.body;
  
    const query = `
      INSERT INTO Athlete (firstName, lastName, startHsYear, endHsYear, genderId, confidentHsYear)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [firstName, lastName, startHsYear, endHsYear, genderId, confidentHsYear];
  
    try {
      await connection.query(query, values);
      res.json({ msg: 'Athlete created successfully' });
    } catch (error) {
      console.log('Error creating athlete:', error);
      res.status(500).json({ error: 'Failed to create athlete' });
    }
  }