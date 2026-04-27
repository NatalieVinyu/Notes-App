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

  return (
    <div>
      {/* LIST */}
      <li className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border">
        {editingId ? (
        <div className="flex gap-2 w-full">
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 px-2 py-1 border rounded"
          />

          <button
            onClick={updateNote}
            className="bg-green-500 text-white px-3 rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <span className="text-gray-800">{note.content}</span>

          <div className="flex gap-2">
            <button
              onClick={startEdit}
              className="text-sm text-blue-500 hover:underline"
            >
              Edit
            </button>

            <button
              onClick={deleteNote}
              className="text-sm text-red-500 hover:underline"
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
