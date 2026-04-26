import { supabaseAdmin } from "../config/supabaseClient.js";

// GET NOTES
export const getNotes = async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from("notes")
    .select("*")
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
};

// CREATE NOTE
export const createNote = async (req, res) => {
  try {
    const { content } = req.body;
    const user = req.user;

    console.log("BODY:", req.body);
    console.log("USER:", user);

    if (!content || !content.trim()) {
      return res.status(400).json({ error: "Content is required" });
    }

    const { data, error } = await supabaseAdmin
    .from("notes")
    .insert([
      {
        user_id: req.user.id,
        content,
      },
    ])
    .select();

  if (error) {
    console.error("Supabase error:", error);
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// UPDATE NOTE
export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, is_pinned } = req.body;

  const { data, error } = await supabaseAdmin
    .from("notes")
    .update({ title, content, is_pinned })
    .eq("id", id)
    .eq("user_id", req.user.id)
    .select();

  if (error) return res.status(400).json({ error: error.cause.message });

  res.json(data);
};

// DELETE NOTE
export const deleteNote = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabaseAdmin
    .from("notes")
    .delete()
    .eq("id", id)
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Note deleted" });
}