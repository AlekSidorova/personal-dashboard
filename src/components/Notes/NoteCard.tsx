//карточка одной заметки
import styles from "./NoteCard.module.css";
import { TNote } from "@/types";

type NoteCardProps = {
  note: TNote;
  onDelete?: (id: string) => void;
};

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  return (
    <div className={styles.card}>
      <p className={styles.text}>{note.text}</p>
      <span className={styles.date}>{note.createdAt}</span>
      {onDelete && (
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(note.id)}
          aria-label="Удалить заметку"
        >
          ×
        </button>
      )}
    </div>
  );
}
