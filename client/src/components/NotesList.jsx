//NOTESLIST.JSX
import NotesItem from "./NotesItem";

function NotesList({ notes, onUpdate, onDelete, loading }) {
  if (loading) {
    return <p>Loading notes...</p>;
  }

  if (!notes.length) {
    return <p className="text-center text-stone-500 mt-10">No notes yet - create your first note</p>
  }

  return (
    <ul className="space-y-3 mt-4">
      {notes.map((note) => (
        <NotesItem
          key={note.id}
          note={note}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default NotesList;