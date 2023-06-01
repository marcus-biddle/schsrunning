import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// MySQL database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// Create a MySQL pool
const pool = mysql.createPool(dbConfig);

// Query function to execute MySQL queries
function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      connection.query(sql, params, (error, results) => {
        connection.release(); // Release the connection

        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  });
}

export { query };
