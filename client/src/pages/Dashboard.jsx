import React from 'react';
import { useEffect, useState } from 'react';
import api from '../services/api';
import NotesForm from '../components/NotesForm';
import NotesList from '../components/NotesList';

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
      loadNotes();
    }, []);

  // -------- FETCH NOTES -------- //
    const loadNotes = async () => {
      try {
        setLoading(true);
        setError('');
  
        const res = await api.get("/notes");
        setNotes(res.data || []);
  
      } catch (err) {
        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
          console.error("AUTH ERROR");
        } else {
          setError("Failed to load notes");
        } 
      } finally {
        setLoading(false);
      }
    };

    const handleCreate = (note) => {
      setNotes(prev => [note, ...prev]);
    };

    const handleUpdate = (id, newContent) => {
      setNotes(prev => prev.map(note => note._id === id ? { ...note, content: newContent }
        : note
      ));
    };

    const handleDelete = (id) => {
      setNotes(prev => [note.note, ...prev]);
    };

  return (
    <div className='flex items-center justify-center'>
      <div className='w-full max-w-screen bg-white rounded-2xl shadow-lg p-8'>
        <NotesForm 
          onNoteCreated={handleCreate}
          setError={setError}
        />

        {error && <p className='text-red-500'>{error}</p>}

        <NotesList 
          notes={notes}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>

      
      
    </div>
  );
}

export default Dashboard;
