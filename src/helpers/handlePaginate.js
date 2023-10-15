export const currentPosts = (data, currentPage, postsPerPage) => {
  const lastPostIdx = currentPage * postsPerPage;
  const fistPostIdx = lastPostIdx - postsPerPage;

  const posts = data?.slice(fistPostIdx, lastPostIdx);

  return posts;
};

export const meta = (data, currentPage, postsPerPage) => {
  const output = {
    currentPage: currentPage,
    totalPages: Math.ceil(data?.length / postsPerPage),
    totalPosts: data?.length,
  };

  return output
};
