import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(express.json());

// create database for refreshTokens
let refreshTokens = []
const users = [];

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken });
    })
})

app.post('/register', async (req, res) => {
    const user = users.find(user => user.name = req.body.name)
    if (user != null) return res.status(400).send('Username already exists.')
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = { name: req.body.name, password: hashedPassword };
        users.push(user);
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
    
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
})


app.post('/login', async (req, res) => {
    // {username, password}

    const user = users.find(user => user.name = req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user.')
    }

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const username = { name: user.username };
            const accessToken = generateAccessToken(username);
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
            refreshTokens.push(refreshToken);
            res.json({ accessToken: accessToken, refreshToken: refreshToken });

            res.send('Success');
        } else {
            res.send('Not Allowed.');
        }
    } catch {
        res.send(500).send();
    }

    
})

// Middleware function
// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (token === null) return res.sendStatus(401);

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);

//         req.user = user;
//         next();
//     })
// }

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
}

app.listen(3000);