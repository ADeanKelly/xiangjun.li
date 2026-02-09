import styles from "@/styles/home.module.css";
import { getSortedPostsData } from "@/lib/md";
import Link from "next/link";
import Image from "next/image";

export default function Home({ posts }) {
  return (
    <>
      <main className={styles.main}>

        {posts.map(post => (
          <figure key={post.slug} style={{ position: 'relative' }}>
            <span className="imageContainer" style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', display: 'block' }}>
              <Image src={post.thumbnail} fill='true' objectFit="cover"></Image>
            </span>
            <figcaption>
              <Link href={post.slug}>
                <h2>{post.title}</h2>
              </Link>
              <p>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
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