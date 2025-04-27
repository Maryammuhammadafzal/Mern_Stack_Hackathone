import express from 'express';
import path from 'path';
import cors from "cors";
// import userRoutes from "./routes/authRoute.js"
import connectToDb from "./db/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

// connect to db
connectToDb();

app.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://mernstackhackathone-production.up.railway.app/',
    'https://mern-stack-hackathone.vercel.app',
  ],
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ⬇️ APIs first
// app.use('/api/auth', userRoutes);

// then static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get("/" ,(req , res)=> {
	res.send("Hello")
})
// last wildcard route
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
