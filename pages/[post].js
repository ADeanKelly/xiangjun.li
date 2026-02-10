import { getPostData, getAllPostIds, getSortedPostsData } from "@/lib/md";
import { parsePostContent } from '@/lib/post';
import styles from '@/styles/post.module.css';

import Link from "next/link";
import Image from "next/image";
import Head from "next/head";


export default function Post({ post, nextPost, prevPost }) {

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.desciption ? post.description : ''} />
      </Head>
      <article className={styles.article}>
        <Image src={post.thumbnail} alt={post.title} loading='eager' width={post.metadata.width} height={post.metadata.height} style={{ width: '100%', height: 'auto' }} placeholder='blur' blurDataURL={post.metadata.blurUrl}></Image>
        <h1>{post.title}</h1>
        <p>{post.date}</p>
        {parsePostContent(post.body)}
      </article>
      <aside className={styles.related_section}>
        {prevPost && (
          <figure id="prev-post" className={`${styles.related_post} ${styles.related_prev}`}>
            <figcaption>
              <Link href={prevPost.slug}>
                <h3>{prevPost.title}</h3>
              </Link>
            </figcaption>
          </figure>
        )}
        {nextPost && (
          <figure id="next" className={`${styles.related_post} ${styles.related_next}`}>
            <figcaption>
              <Link href={nextPost.slug}>
                <h3>{nextPost.title}</h3>
              </Link>
            </figcaption>
          </figure>
        )}
      </aside>
    </>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const { params } = context;
  const allPostData = getSortedPostsData();
  const postData = await getPostData(params.post);

  // console.log(allPostData);
  const index = allPostData.findIndex((p) => p.slug === postData.slug);
  const nextPostData = allPostData[index - 1] || null;
  const prevPostData = allPostData[index + 1] || null;

  return {
    props: {
      post: postData,
      nextPost: nextPostData,
      prevPost: prevPostData
    }
  }
}