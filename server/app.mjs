
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from 'path';
import connectToDb from "./db/db.js";
import authRoutes from "./routes/authRoute.js";
import taskRoutes from "./routes/taskRoute.js";
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

dotenv.config();
const app = express();

app.use(cors({
  origin: [
    'https://mern-stack-hackathone.vercel.app',
    // "http://localhost:5173",
    // "http://localhost:5000",
    // "https://mernstackhackathone-production.up.railway.app/",
  ],
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

// dumy route
app.get('/favicon.ico', (req, res) => res.status(204).end());


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
// / api route
app.get("/" ,(req , res)=> {
  res.send("Hello")
})

// app listen on Port
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

app.use(express.static(path.join(__dirname, '../client/dist')));

// Connected to database
connectToDb();
