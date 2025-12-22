import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), "_posts/blog");
const postIndexFilePath = path.join(process.cwd(), 'cms/post_index.json');
const mediaIndexFilePath = path.join(process.cwd(), 'cms/media_index.json');

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const {data} = matter(fileContents);

    console.log(data);
    
    return {
      slug,
      ...data,
      publishedDate: data.publishedDate instanceof Date ? data.publishedDate.toISOString() : data.publishedDate,
      modifiedDate: data.modifiedDate instanceof Date ? data.modifiedDate.toISOString() : data.modifiedDate
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
  const mediaIndexFile = fs.readFileSync(mediaIndexFilePath);
  const mediaIndexObject = JSON.parse(mediaIndexFile);

  const fullPath = path.join(postsDirectory, `${slug}.md`);

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const postContent = await remark().use(html).process(matterResult.content);

  const mediaMetadata = mediaIndexObject.find(obj => matterResult.data.thumbnail.includes(obj.file));
  matterResult.data.metadata = mediaMetadata.metadata;
  console.log(matterResult.data);


  return {
    slug,
    ...matterResult.data,
    publishedDate: matterResult.data.publishedDate instanceof Date ? matterResult.data.publishedDate.toISOString() : matterResult.data.publishedDate,
    modifiedDate: matterResult.data.modifiedDate instanceof Date ? matterResult.data.modifiedDate.toISOString() : matterResult.data.modifiedDate,
    body: postContent.value
  }
}