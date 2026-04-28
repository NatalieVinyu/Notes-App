//authMiddleware.js
import { supabaseAdmin } from "../config/supabaseClient.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided'});
    }

    const token = authHeader.split(" ")[1];
    const { data, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = data.user;
    next();
    
  } catch (err) {
    console.error("AUTH MIDDLEWARE ERROR:", err);
    return res.status(500).json({ error: "Auth server error" })
  } 
};