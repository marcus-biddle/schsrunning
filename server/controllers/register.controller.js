import bcrypt from 'bcrypt';
import AsyncHandler from 'express-async-handler';
import User from '../models/User.js';

export const handleRegister = AsyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ "message": "Username and password are required." });

    const duplicate = await User.findOne({ 'username': username });
    if (duplicate) return res.sendStatus(409);
     
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = { "username": username, "password": hashedPassword, "roles": ['user'] };
        const newUser = new User(user);
        newUser.save();

        res.status(201).json({ "success": `New user ${user.username} created!` });
    } catch {
        res.status(500).json({ "message": error.message });
    }
    
});