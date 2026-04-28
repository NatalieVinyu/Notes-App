//NOTESLIST.JSX
import NotesItem from "./NotesItem";
import { BallTriangle } from "react-loader-spinner";

function NotesList({ notes, onUpdate, onDelete, loading }) {
  //REACT-LOADER-SPINNER
    if (loading) {
      return (
        <div className="flex justify-center mt-10">
          <BallTriangle
            height={0}
            width={50}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )
    }

  if (!notes || !notes.length) {
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