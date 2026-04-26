//authControl.js
import { supabaseAdmin } from "../config/supabaseClient.js";

// SIGNUP
export const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' });

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  });

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({ user: data.user });
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' });

  const { data, error } = await supabaseAdmin.auth.signInWithPassword({
    email,
    password
  });

  if (error) return res.status(401).json({ error: error.message });

  res.json({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    user: data.user
  })
}

// LOGOUT
export const logout = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token)
    return res.status(401).json({ error: 'Unauthorized' });

  const { error } = await supabaseAdmin.auth.admin.signOut(token);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: 'Logged out successfully' });
};