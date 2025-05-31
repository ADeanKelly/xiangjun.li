import "@/styles/globals.css";
import {Molengo, Lexend} from 'next/font/google';
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
    <span className={`${molengo.variable} ${lexend.variable}`}>
      <Component {...pageProps} />
    </span>
  )
}
