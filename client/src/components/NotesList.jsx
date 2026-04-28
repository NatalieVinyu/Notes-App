//NOTESLIST.JSX
import NotesItem from "./NotesItem";

function NotesList({ notes, onUpdate, onDelete, loading }) {
  if (loading) {
    return <p>Loading notes...</p>;
  }

  if (!notes.length) {
    return <p>No notes yet</p>
  }

  return (
    <ul>
      {notes.map((note) => (
        <NotesItem
          key={note._id}
          note={note}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default NotesList;