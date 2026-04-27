//NOTESFROM.JSX
import React from 'react';
import { useState } from 'react';
import api from '../services/api';

function NotesForm({ newNote, setNewNote, onNoteCreated, setError }) {

  //---------- CREATE NEW NOTE -------------
    const addNote = async () => {
      if (!newNote.trim()) {
        setError('Note cannot be empty');
        return;
      }
  
      try {
        const res = await api.post('/notes', {
          content: newNote.trim(),
        });
  
        onNoteCreated(res.data[0]);
        setNewNote("");
        setError("")
      } catch (err) {
        console.error("Add note error:", err.response?.data || err);
        setError("Failed to add note");
      }
  
      console.log("NEW NOTE:", newNote);
    };
    
  return (
    <div>
      {/* INPUT */}
      <input 
        type="text"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder='Write a note...'
        className='border m-4 p-2'
      />

      <button onClick={addNote} className='bg-green-100 hover:bg-green-50 cursor-pointer p-2'>
        Add Note
      </button>
    </div>
  )
}

export default NotesForm;
