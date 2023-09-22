import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

/** Use databse for users, refreshtokens */

export const handleLogout = (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    // RefreshToken in DB?
    const foundUser = users.find(person => person.refreshToken = refreshToken)
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in DB
    const otherUsers = users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = {...foundUser, refreshToken: ''};
    /** Update users in DB */

    res.clearCookie('jwt', { httpOnly: true }); // secure: true - only serves on https on production
    res.sendStatus(204);
};