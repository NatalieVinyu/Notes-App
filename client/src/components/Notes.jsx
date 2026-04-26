import { useEffect, useState } from 'react';
import api from '../services/api';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editText, setEditText] = useState(''); //ADD EDIT STATE
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // -------- FETCH NOTES -------- //
  const loadNotes = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await api.get("/notes");
      setNotes(res.data || []);
    } catch (err) {
      setError("Failed to load notes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  //---------- CREATE NEW NOTE -------------
  const addNote = async () => {
    if (!newNote.trim()) {
      setError("Please enter a note");
      return;
    }

    try {
      await api.post('/notes', {
        content: newNote.trim(),
      });

      setNewNote("");
      loadNotes();
    } catch (err) {
      console.error("Add note error:", err.response?.data || err);
    }

    console.log("NEW NOTE:", newNote);
  };

  //----------- UPDATE --------------
  const updateNote = async () => {
    if (!editText.trim()) return;

    try {
      await api.put(`/notes/${editingId}`, {
        content: editText,
      });

      setEditingId(null);
      setEditText("");
      loadNotes();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const startEdit = (note) => {
    setEditingId(note.id);
    setEditText(note.content);
  };

  //---------- DELETE --------------
  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      loadNotes();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className='m-4'>
      <h1 className='text-3xl pb-8'>Supabase Test</h1>

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

      {/* STATES */}
      {loading && <p>Loading notes...</p>}
      {error && <p className='text-red-500'>{error}</p>}

    {/* LIST */}
      <ul className='space-y-2'>
        {notes.map((note) => (
          <li 
            key={note.id}
            className='flex items-center justify-between bg-gray-50 p-3 rounded-lg border'
          >
            {editingId === note.id ? (
              <div className='flex gap-2 w-full'>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className='flex-1 px-2 py-1 border rounded'
              />
              <button 
                onClick={updateNote}
                className='bg-green-500 text-white px-3 rounded hover:bg-green-600'
              >
                Save
              </button>
              </div>       
            ) : (
              <span className='text-gray-800'>
                {note.content}
                <button 
                  onClick={() => startEdit(note)}
                  className='text-sm text-blue-500 hover:underline pl-4'
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteNote(note.id)}
                  className='text-sm text-red-500 hover:underline pl-4'
                >
                  Delete
                </button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Notes;