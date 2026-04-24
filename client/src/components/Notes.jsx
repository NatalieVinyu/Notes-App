import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

function Notes() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [editText, setEditText] = useState('') //ADD EDIT STATE
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    const loadNotes = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession()

      console.log('Fetching notes for user:', user)

      if (session?.user) {
        getNotes()
      }
    }
    loadNotes()
  }, [])

  async function getNotes() {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching notes:', error)
    } else {
      setNotes(data || [])
      console.log('Supabase working:', data)
    }
  }

  // INSERT FUNCTION
  const addNote = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    console.log('Current user:', user)

    if (!user) {
      console.error('User not logged in')
      return
    }

    const {error} = await supabase
      .from('notes')
      .insert([{ content: newNote, user_id: user.id}])

    if (error) {
      console.error(error)
    } else {
      setNewNote('')
      getNotes() // REFRESH LIST
    }
  }

  // UPDATE FUNCTION
  const updateNote = async () => {
    if (!editText.trim()) return

    const {error} = await supabase
    .from('notes')
    .update({ content: editText })
    .eq('id', editingId)

    if (error) {
      console.error('Error updating note:', error)
    } else {
      setEditingId(null)
      setEditText('')
      getNotes()
    }
  }

  const startEdit = (note) => {
    setEditingId(note.id)
    setEditText(note.content)
  }

  // DELETE FUNCTION
  const deleteNote = async (id) => {
    const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)

    if (error) {
      console.error('Error deleting note:', error)
    } else {
      getNotes() //refresh list
    }
  }

  return (
    <div className='m-4'>
      <h1 className='text-3xl pb-8'>Supabase Test</h1>

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

      <ul className='space-y-2'>
        {notes.map(note => (
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