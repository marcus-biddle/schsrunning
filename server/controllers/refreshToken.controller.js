import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const users = [
    {
        "username": "ky2",
        "password": "password",
        "roles": {
            "admin": 5150
        }
      }
];

dotenv.config();

export const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;

    // Validate req.body
    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    const foundUser = users.find(person => person.refreshToken = refreshToken)
    if (!foundUser) return res.sendStatus(403);

    try {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
                const roles = Object.values(foundUser.roles);
                const accessToken = generateAccessToken(
                    { 
                        "UserInfo": {
                            "username": decoded.username, 
                            "roles": roles 
                        }
                    }
                );
                res.json({ accessToken: accessToken })
            }
        )
    } catch {
        res.sendStatus(500);
    }
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7m' });
}