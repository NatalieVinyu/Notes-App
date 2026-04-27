//authMiddleware.js
import { supabaseAdmin } from "../config/supabaseClient.js";

export const authenticate = async (req, res, next) => {
  console.log("COOKIES:", req.cookies);
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized'});
  }

  try {
    const { data, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !data.user) {
      console.log("AUTH ERROR:", error);//debug
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = data.user;
    next();
    
  } catch (err) {
    console.error("AUTH MIDDLEWARE ERROR:", err);
    return res.status(500).json({ error: "Auth server error" })
  } 
};