import Link from "next/link";

import "@/styles/globals.css";
import styles from '@/styles/general.module.css';

import { Molengo, Lexend, Noto_Serif_SC } from 'next/font/google';
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
const noto_serif_sc = Noto_Serif_SC({
  weight: ['400', '600'],
  variable: '--font-family-text-chinese'
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <header className={`${styles.header} ${molengo.variable} ${lexend.variable}`}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <Link className={styles.navLink} href={'/'}>
              <img src="/portrait.jpg" className={styles.logoImage} />
            </Link>
            <p>Dear Janet,</p>

          </div>

          <nav className={styles.nav}>
            <Link className={styles.navLink} href={'/'}>Home</Link>
            {/* <Link className={styles.navLink} href={'/'}>About</Link> */}
          </nav>
        </div>
      </header>
      <span className={`${molengo.variable} ${lexend.variable} ${noto_serif_sc.variable}`}>
        <Component {...pageProps} />
      </span>
      <footer className={styles.footer}>

      </footer>
    </>
  )
}
