import express from 'express';
import { supabaseAdmin } from '../config/supabaseClient.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
  const user_id = req.user.sub; // from the verified JWT
  const { content } = req.body;

  if (!user_id || !content) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('notes')
      .insert([{ user_id, content}])
      .select();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

export default router;