"use client";

import { useState, useEffect } from "react";
import { NotesList } from "@/components/Notes";
import { TNote } from "@/types";
import styles from "./page.module.css";

export default function NotesPage() {
  const [notes, setNotes] = useState<TNote[]>([]); //notes-хранит список заметок
  const [text, setText] = useState(''); //text-хранит текст заметки
  const [isLoaded, setIsLoaded] = useState(false); //isLoaded нужен, чтобы избежать перезаписи

  //загрузка из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('notes'); //читаем данные из браузера
    if (saved) {
      setNotes(JSON.parse(saved)); //если есть-превращаем в массив (кладет в state и включает флаг загрузки)
    }
    setIsLoaded(true);
  }, []);

    //сохранение в localStorage (только после загрузки данных)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('notes', JSON.stringify(notes)); //превращаем массив в строку->сохраняем в браузере
    }
  }, [notes, isLoaded]);

  //добавление заметки
  const addNote = () => {
    if (!text.trim()) return; //защита от пустых заметок

    const newNote: TNote = {
      id: crypto.randomUUID(), //создает уникальный id
      text,
      createdAt: new Date().toISOString(), //удобно для сортировки и форматирования
    }

    setNotes([newNote, ...notes]) //добавляем заметки в начало списка
    setText('') //очищаем поля ввода
  }

  //удаление заметки
  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id)) //перебираем массив, оставляем все кроме нужного id, обновляем state
  }

  return (
    <div className={styles.page}>

      {/* заголовок*/}
      <div className={styles.header}>
        <h1 className={styles.title}>Заметки</h1>
        <button className={styles.addButton} onClick={addNote}>
          +
        </button>
      </div>

      {/* Input */}
      <textarea
        placeholder="Напиши что нибудь..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={styles.textarea} 
        />

      {/* Заметки */}
      <NotesList notes={notes} onDelete={deleteNote}/>
    </div>
  )
}