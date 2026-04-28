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
      setNotes(prev => prev.map(note => note.id === id ? { ...note, content: newContent }
        : note
      ));
    };

    const handleDelete = (id) => {
      setNotes((prev) => prev.filter((note) => note.id !== id));
    };

  return (
      <div className='w-full max-w-4xl mx-auto px-4 sm:px-6 py-8'>
        <NotesForm 
          onNoteCreated={handleCreate}
          setError={setError}
        />

        {error && <p className='text-sm mt-3 text-red-500'>{error}</p>}

        <NotesList 
          notes={notes}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
  );
}

export default Dashboard;
