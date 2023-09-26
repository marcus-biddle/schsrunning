import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../../models/User.js';

let refreshTokens = []

export const handleLogin = expressAsyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // Validate req.body
    if (!username || !password) return res.status(400).json({ "message" : "Username and password is required."})

    const foundUser = await User.findOne({ username }).lean().exec();
    if (!foundUser) return res.status(401).json({ "message" : "Cannot find user."})

    try {
        const match = await bcrypt.compare(password, foundUser.password);
        console.log(match);

        if (match) {
            const roles = Object.values(foundUser.roles);
            // create JWT
            const accessToken = generateAccessToken(
                { "UserInfo": {
                     "username": foundUser.username, "roles": roles 
                    }
                }
            );
            const refreshToken = generateRefreshToken({ "username": foundUser.username })

            refreshTokens.push(refreshToken);

            // Saving refreshToken with current user
            await User.findOneAndUpdate(
                { username: foundUser.username },
                { refreshToken: refreshToken},
                { new: true }
            );
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
            res.json({ accessToken: accessToken, roles: roles });
        } else {
            res.json('Not Allowed.');
        }
    } catch {
        res.sendStatus(500);
    }
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
}