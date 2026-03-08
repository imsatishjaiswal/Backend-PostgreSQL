import pool from "../config/dbConnect.js";

const createUserTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
)`;
  try {
    await pool.query(queryText);
    console.log("User Table Created if not exist");
  } catch (error) {
    console.log("Error in creating table:", error.message);
  }
};

export default createUserTable;
