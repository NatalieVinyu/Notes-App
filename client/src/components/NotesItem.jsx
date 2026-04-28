//NOTESITEM.JSX
import React from 'react';
import { useState } from 'react';
import api from '../services/api';

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
    <div>
      {/* LIST */}
      <li className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex items-center justify-between mb-6">

        {editingId ? (
        <div className="flex gap-2 w-full">

          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            onClick={updateNote}
            className="bg-green-500 text-white px-4 py-4 rounded-lg hover:bg-green-600 transition"
          >
            Save
          </button>
        </div>
      ) : (
        <>
          {/* NOTE TEXT */}
          <div className='flex flex-col'>
            <span className="text-gray-800 text-sm font-semibold">
              {note.content}
            </span>
            <span className='text-xs text-gray-400 mt-1'>
              {formattedDate}
            </span>
          </div>
          

          {/* ACTIONS */}
          <div className="flex items-center gap-2 ml-4">

            <button
              onClick={startEdit}
              className="text-sm px-3 py-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
            >
              Edit
            </button>

            <button
              onClick={deleteNote}
              className="text-sm px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
    </div>
  )
}

export default NotesItem;
