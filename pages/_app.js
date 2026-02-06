import Link from "next/link";

import "@/styles/globals.css";
import Layout from '@/components/layout';
import styles from '@/styles/general.module.css';


import { Molengo, Lexend } from 'next/font/google';
const molengo = Molengo({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-family-text'
});
const lexend = Lexend({
  weight: ['600'],
  subsets: ['latin'],
  variable: '--font-family-headline'
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <header className={`${styles.header} ${molengo.variable} ${lexend.variable}`}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <img src="/portrait.jpg" className={styles.logoImage} />
            Dear Janet,
          </div>

          <nav className={styles.nav}>
            <Link className={styles.navLink} href={'/'}>Home</Link>
            <Link className={styles.navLink} href={'/'}>About</Link>
          </nav>
        </div>
      </header>
      <span className={`${molengo.variable} ${lexend.variable}`}>
        <Component {...pageProps} />
      </span>
    </>
  )
}
