//NOTESFROM.JSX
import React from 'react';
import { useState } from 'react';
import api from '../services/api';

function NotesForm({ onNoteCreated, setError }) {
const [showModal, setShowModal] = useState(false);
const [newNote, setNewNote] = useState("");
const [loading, setLoading] = useState(false);

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
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-semibold text-stone-800'>Your Notes</h1>

        <button onClick={() => setShowModal(true)} className='flex items-center gap-2 bg-green-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer p-2'>
          + New Note
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl p-6">

            <h2 className="text-base font-semibold text-stone-800 mb-4">Create New Note</h2>
            <form onSubmit={addNote} className="space-y-4">
              {/* TEXTAREA */}
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder='Write a note...'
                rows={4}
                autoFocus
                className='w-full border border-stone-200 p-3 rounded-lg text-sm text-stone-800 resize-none focus:outline-none focus:ring-2 focus:ring-green-400'
              />

              <div className="flex justify-end gap-2">

                <button 
                  type='button' 
                  onClick={() => setShowModal(false)} 
                  className='px-3 py-1 border border-stone-200 rounded-lg hover:bg-stone-50 transition'>
                  Cancel
                </button>

                <button 
                  type='submit' 
                  disabled={loading}
                  className='bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition disables:opacity-50 disabled:cursor-not-allowed cursor-pointer'>
                    {loading ? "Saving..." : "Save note"}
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
