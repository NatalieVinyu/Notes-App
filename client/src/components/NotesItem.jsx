//NOTESITEM.JSX
import React from 'react';
import { useState } from 'react';
import api from '../services/api';
import { FaPen } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function NotesItem({ note, onUpdate, onDelete }) {
  const [editText, setEditText] = useState(''); 
  const [editingId, setEditingId] = useState(false);

  // START EDIT
  const startEdit = () => {
    setEditingId(note.id);
    setEditText(note.content);
  };

  //----------- UPDATE --------------
  const updateNote = async () => {
    if (!editText.trim()) return;

    try {
      await api.put(`/notes/${note.id}`, {
        content: editText,
      });

      onUpdate(note.id, editText); 
      setEditingId(false);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  //---------- DELETE --------------
  const deleteNote = async () => {
    try {
      await api.delete(`/notes/${note.id}`);
      onDelete(note.id); 
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  //CURRENT DATE AND TIME
  const formattedDate = note.created_at
    ? new Date(note.created_at).toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    }) : "";

  return (
      <div className="bg-white border border-stone-200 rounded-xl p-4 hover:border-stone-300 transition flex flex-col gap-3">

        {editingId ? (
          <div className="flex gap-2">
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1 px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
            />

            <button
              onClick={updateNote}
              className="bg-green-500 text-white px-4 py-4 rounded-lg hover:bg-green-600 transition text-sm"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-2 border border-stone-200 rounded-lg hover:bg-stone-50 transition text-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
        <div>
          {/* NOTE TEXT */}
            <p className="text-sm text-stone-800 leading-relaxed flex-1">
              {note.content}
            </p>
            <div className='flex items-center justify-between border-t border-stone-100 pt-3'>
              <span className='text-xs text-gray-400'>
                {formattedDate}
              </span>
              <div className='flex gap-2'>
                <button
                  onClick={startEdit}
                  className="text-sm px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                >
                  <FaPen size={12} />
                </button>
                <button
                  onClick={deleteNote}
                  className="text-sm px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                >
                  <MdDeleteForever size={14} />
                </button>
              </div>
            </div>
        </div>
        )}
      </div>    
  );
}

export default NotesItem;
