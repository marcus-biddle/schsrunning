import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

let refreshTokens = []
const users = [
    {
        "username": "ky2",
        "password": "password",
        "roles": {
            "admin": 5150
        }
      }
];

export const handleLogin = async (req, res) => {
    const { username, password } = req.body;

    // Validate req.body
    if (!username || !password) return res.status(400).json({ "message" : "Username and password is required."})
    const foundUser = users.find(person => person.username = username)
    if (!foundUser) return res.status(401).json({ "message" : "Cannot find user."})

    try {
        console.log(password);
        console.log(foundUser.password);
        // test purposes
        const hash = await bcrypt.hash(foundUser.password, 10);
        console.log(hash);
        const match = await bcrypt.compare(password, hash);
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
            const otherUsers = users.filter(person => person.username !== foundUser.username);
            const currentUser = { ...foundUser, refreshToken };
            /** Need to set Users to [...otherUsers, currentUser] in the database */
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
            res.json({ accessToken: accessToken });
        } else {
            res.json('Not Allowed.');
        }
    } catch {
        res.sendStatus(500);
    }
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
}