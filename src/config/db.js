import dotenv from "dotenv";
dotenv.config();
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
pool.on("error", (err) => {
  console.error("Unexpected database error on idle client:", err.message);
});

try {
  const client = await pool.connect();
  console.log("Database connection established successfully.");
  client.release();
} catch (err) {
  if (err.code === "ECONNREFUSED") {
    console.error("❌ ERROR: Database connection refused.");
  } else if (err.code === "28P01") {
    console.error(
      "❌ ERROR: Invalid database password provided for user " +
        process.env.DB_USER,
    );
  } else if (err.code === "3D000") {
    console.error(
      "❌ ERROR: Database '" + process.env.DB_NAME + "' does not exist.",
    );
  } else {
    console.error("❌ Failed to connect to the database:", err.message);
  }
}

export default pool;
