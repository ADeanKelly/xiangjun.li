import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import styles from "@/styles/home.module.css";
import { getSortedPostsData } from "@/lib/md";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Dear Janet,</title>
      </Head>
      <main className={styles.main}>
        {posts.map(post => (
          <figure key={post.slug} className={styles['blog-post']} style={{ position: 'relative' }}>
            <Link href={post.slug}>

              <span className="imageContainer" style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', display: 'block' }}>
                <Image src={post.thumbnail} fill='true' style={{ objectFit: 'cover' }}></Image>
              </span>
              <figcaption>
                <h2 className={styles['blog-title']}>{post.title}</h2>
                {/* <p className={styles['blog-content']}>{post.description}</p> */}
                <p className={styles['blog-date']}>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </figcaption>
            </Link>
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