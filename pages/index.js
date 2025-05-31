import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/home.module.css";
import { getSortedPostsData } from "@/lib/md";
import Link from "next/link";

export default function Home({posts}) {
  return (
    <>
    <main className={styles.main}>

      {posts.map(post => (
        <figure key={post.slug}>
          <figcaption>
            <Link href={post.slug}>
              <h2>{post.title}</h2>
            </Link>
            <p>{post.date}</p>
          </figcaption>
        </figure>
      ))}
      </main>
    </>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      posts: allPostsData,
    }
  }
}