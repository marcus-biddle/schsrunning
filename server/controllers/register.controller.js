import bcrypt from 'bcrypt';

const users = [];

export const handleRegister = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ "message": "Username and password are required." });

    const duplicate = users.find(person => person.username === username);
    if (duplicate) return res.sendStatus(409);

    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Add to db [...users, user]
        const user = { "username": username, "roles": { "User": 2001, }, "password": hashedPassword };
        users.push(user);
        res.status(201).json({ "success": `New user ${user} created!` });
    } catch {
        res.status(500).json({ "message": error.message });
    }
    
};