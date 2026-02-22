//оболочка всего сайта - рендерится один раз, меняется только {children} внутри
import "./globals.css";
import type { Metadata } from "next"; //типизация для всего SEO и заголовков страницы
import Link from "next/link"; //компонент для навигации без перезагрузки
import styles from "./layout.module.css";

//управляет: заголовком вкладки, SEO, превтю при шаринге
export const metadata: Metadata = {
  title: "Personal Dashboard",
  description: "Life OS app",
};

//главный layout всего приложения
//cgildren - это контент страницы
export default function RootLayout({ children }:  { children: React.ReactNode}) {
  return (
    <html lang="ru">
      <body className={styles.layout}>
        <aside className={styles.sidebar}>
          <h3>Life OS</h3>
          <nav className={styles.nav}>
            <Link href="/dashboard">Главная</Link>
            <Link href="/notes">Заметки</Link>
            <Link href="/stats">Трекеры</Link>
            <Link href="/plans">Планы</Link>
            <Link href="/settings">Настройки</Link>
          </nav> 
        </aside>
        {/* main - основной контент страницы, меняется только children */}
        <main className={styles.main}>
          {children}
        </main> 
      </body>
    </html>
  )
}