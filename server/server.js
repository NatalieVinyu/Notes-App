// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './src/routes/authRoutes.js'
import notesRoutes from './src/routes/notesRoutes.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/notes', notesRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Auth routes:', authRoutes.stack?.map(r => r.route?.path));
  console.log('Notes routes:', notesRoutes.stack?.map(r => r.route?.path));
});