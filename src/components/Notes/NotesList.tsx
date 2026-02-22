//список всех заметок
import { TNote } from "@/types";
import styles from "./NotesList.module.css";
import NoteCard from "./NoteCard";

type NotesListProps = {
  notes: TNote[];
  onDelete?: (id: string) => void;
}

export default function NotesList({ notes, onDelete }: NotesListProps) {
  if (notes.length === 0) {
    return (
      <p className={styles.noNotes}>Тут пока пусто</p>
    )
  }

  return (
    <div className={styles.list}>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onDelete={onDelete} />
      ))}
    </div>
  )
}