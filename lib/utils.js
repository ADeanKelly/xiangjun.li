import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), "_posts/blog");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const {data} = matter(fileContents);
    
    return {
      slug,
      ...data,
      date: data.date instanceof Date ? data.date.toISOString() : data.date
    }
  })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  const filePaths = fileNames.map((fileName) => ({
    params: {
      post: fileName.replace(/\.md$/, ""), // Removing .md extension
    },
  }));

  return filePaths;
}

export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const postContent = await remark().use(html).process(matterResult.content);

  return {
    slug,
    ...matterResult.data,
    date: matterResult.data.date instanceof Date ? new Date(matterResult.data.date).toISOString() : matterResult.data.date,
    body: postContent.value
  }
}