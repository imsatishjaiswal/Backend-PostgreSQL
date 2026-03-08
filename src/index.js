import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandling from "./middlewares/errorhandler.js";
import createUserUserTable from "./data/createUserTable.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api", userRoutes);
//Error Handling middleware
app.use(errorHandling);
//Create table before starting server
createUserUserTable();
//DB Connection
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`DB Name is: ${result.rows[0].current_database}`);
});
//server running
app.listen(port, () => {
  console.log(`Server runs on: ${port}`);
});
