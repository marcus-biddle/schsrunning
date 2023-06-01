import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import athletesRoutes from './routes/athlete.route.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Middleware to make MySQL connection pool available in request object
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// Parse JSON request bodies
app.use(express.json());

// Routes
app.use('/', athletesRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
