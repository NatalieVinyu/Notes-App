//notesRoutes.js
import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { getNotes, createNote, updateNote, deleteNote } from "../controllers/notesControl.js";

const router = express.Router();

router.get("/", authenticate, getNotes);
router.post("/", authenticate, createNote);
router.put("/:id", authenticate, updateNote);
router.delete("/:id", authenticate, deleteNote);

export default router;