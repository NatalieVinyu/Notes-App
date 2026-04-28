//NOTESFROM.JSX
import React from 'react';
import { useState } from 'react';
import api from '../services/api';

function NotesForm({ onNoteCreated, setError }) {
const [showModal, setShowModal] = useState(false);
const [newNote, setNewNote] = useState("");

  //---------- CREATE NEW NOTE -------------
    const addNote = async (e) => {
      e.preventDefault();

      if (!newNote.trim()) {
        setError('Note cannot be empty');
        return;
      }
  
      try {
        const res = await api.post('/notes', {
          content: newNote.trim(),
        });

        console.log("RES.DATA:", res.data);

        const createdNote = Array.isArray(res.data)
        ? res.data[0]
        : res.data;

        onNoteCreated(createdNote);
  
        setNewNote("");
        setShowModal(false);
        
      } catch (err) {
        console.log("STATUS:",err.response?.status);
        console.log("BACKEND ERROR:",err.response?.status);
        setError("Failed to add note");
      }
      console.log("SENDING", newNote);
    };
    
  return (
    <div>
      {/* HEADER */}
      <div className='flex justify-between'>
        <h1 className='text-3xl'>Your Notes</h1>
        <button onClick={() => setShowModal(true)} className='bg-green-100 hover:bg-green-50 cursor-pointer p-2'>
          + New Note
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Create New Note</h2>
            <form onSubmit={addNote} className="space-y-4">
              {/* INPUT */}
              <input 
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder='Write a note...'
                className='w-full border  p-2 rounded-lg'
              />

              <div className="flex justify-end gap-2 mt-4">

                <button type='button' onClick={() => setShowModal(false)} className='px-3 py-1 border rounded-lg'>
                  Cancel
                </button>

                <button type='submit' className='bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 cursor-pointer'>
                  Save
                </button>
              </div>
            </form>
          </div>

        </div>
      )}

      
    </div>
  )
}

export default NotesForm;
