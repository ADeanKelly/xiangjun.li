// const MediaIndex = require('@/cms/media_index.json');
const fs = require('fs'); // Modern promise-based API
const path = require('path');
const matter = require('gray-matter');
const sharp = require('sharp');

const postIndexPath = path.join(process.cwd(), 'cms/post_index.json');
const mediaIndexFile = path.join(process.cwd(), 'cms/media_index.json');
const postsDirectory = path.join(process.cwd(), "_posts/blog");
const mediaDirectory = path.join(process.cwd(), '/public/images/uploads');

async function buildPostIndex() {

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const fileStats = fs.statSync(fullPath);

    const { data } = matter(fileContents);

    return {
      slug,
      createdTime: fileStats.ctime,
      modifiedTime: fileStats.mtime,
      ...data,
    }
  });

  const postIndexFile = fs.readFileSync(postIndexPath, 'utf8');
  const postIndexObject = JSON.parse(postIndexFile);

  fs.writeFileSync(postIndexPath, JSON.stringify(allPostsData));
}

async function buildMediaIndex() {
  const fileNames = fs.readdirSync(mediaDirectory);
  // console.log(fileNames);
  const imageFiles = fileNames.filter(file =>
    /\.(jpe?g|png|webp|tiff?|gif|bmp)$/i.test(file)
  );
  const metadataArray = [];

  for (const file of imageFiles) {
    const filePath = path.join(mediaDirectory, file);
    const publicPath = path.join('/admin/images/upload/', file);

    try {
      const image = sharp(filePath);
      const metadata = await image.metadata();
      const blurUrl = await getBase64(filePath, 24, metadata.format);

      // console.log(blurUrl);

      metadataArray.push({
        file: file,
        filePath: publicPath,
        metadata: {
          width: metadata.width,
          height: metadata.height,
          blurUrl: blurUrl
        },
      });
    }

    catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }

  fs.writeFileSync(mediaIndexFile, JSON.stringify(metadataArray));
}

async function getBase64(src, size, format) {
  const { info, data } = await sharp(src)
    .resize(size)
    .blur()
    .toBuffer({ resolveWithObject: true });

  return `data:image/${format};base64,${data.toString('base64')}`;
};

buildPostIndex();
buildMediaIndex();