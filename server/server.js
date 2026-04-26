// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './src/routes/users.js'
import notesRoutes from './src/routes/notes.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/notes', notesRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});