import {getPostData, getAllPostIds} from "@/lib/utils"; // Import the utility functions
import {parsePostContent} from '@/lib/post';

export default function Post({post}) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      {parsePostContent(post.body)}
    </article>
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
  const {params} = context;
  const postData = await getPostData(params.post);

  return {
    props: {
      post: postData
    }
  }
}