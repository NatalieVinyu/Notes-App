//authMiddleware.js
import { supabaseAdmin } from "../config/supabaseClient.js";

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized'});
  }

  console.log("TOKEN:", token);

  const { data, error } = await supabaseAdmin.auth.getUser(token);

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error || !data.user) {
    console.log("AUTH ERROR:", error);//debug
    return res.status(401).json({ error: 'Invalid token' });
  }

  req.user = data.user;
  next();
};