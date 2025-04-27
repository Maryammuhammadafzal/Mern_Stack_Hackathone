import express from 'express';
import path from 'path';
import cors from "cors";
// import userRoutes from "./routes/authRoute.js"
import connectToDb from "./db/db.js";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// connect to db
connectToDb();

app.use(express.json());

app.use(cors({
  origin: [
    'https://mern-stack-hackathone.vercel.app',
  ],
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

// ⬇️ APIs first
// app.use('/api/auth', userRoutes);

// then static files
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
