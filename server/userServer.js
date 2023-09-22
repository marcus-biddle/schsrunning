import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
dotenv.config();

app.use(express.json());

const users = [];

app.get('/users', (req, res) => {
    res.json(users);
})

app.post('/users', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(salt);
        console.log(hashedPassword);
        const user = { name: req.body.name, password: hashedPassword };
        users.push(user);
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
    
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user.')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success');
        } else {
            res.send('Not Allowed.');
        }
    } catch {
        res.send(500).send();
    }
})

// Middleware function
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    })
}

app.listen(4000);