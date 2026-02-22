export const quickSortPosts = (postArray) => {
  if (postArray.length <= 1) return postArray;
  const p = postArray.pop();

  const leftArray = [];
  const rightArray = [];

  for (const post of postArray) {
    if (post.publishedDate >= p.publishedDate) {
      leftArray.push(post);
    }
    else {
      rightArray.push(post);
    }
  }
  return [...quickSortPosts(leftArray), p, ...quickSortPosts(rightArray)];
}