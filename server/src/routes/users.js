//import express from 'express';
import { supabaseAdmin } from '../config/supabaseClient.js';
//import { authenticate  } from '../middleware/auth.js';

app.get('/users', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*');

    if (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
