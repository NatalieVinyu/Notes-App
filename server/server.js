// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import authRoutes from './src/routes/authRoutes.js'
import notesRoutes from './src/routes/notesRoutes.js'

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Auth routes:', authRoutes.stack?.map(r => r.route?.path));
  console.log('Notes routes:', notesRoutes.stack?.map(r => r.route?.path));
});