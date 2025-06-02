import styles from '@/styles/general.module.css';

export default function Layout() {

  return (
    <>
    <header className={styles.header}>
      <div class={styles.background}></div>
      <nav className={styles.header_inner}><p>Dear Janet,</p></nav>
    </header>
    </>
  )
}