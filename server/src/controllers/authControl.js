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

  return res.status(201).json({ 
    message: "User created successfully", 
    user: data.user ,
  });
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

  //SETTING COOKIE
  res.cookie("token", data.session.access_token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  })

  res.json({ message: "Login successful", user: data.user });
}

// LOGOUT
export const logout = async (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Logged out successfully" })
};