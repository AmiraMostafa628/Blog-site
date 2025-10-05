export const sortPosts = (postsArray) => {
  const parseDate = (str) => {
    const fullStr = `${str.split(" - ")[0]} ${new Date().getFullYear()} ${
      str.split(" - ")[1] || "00:00"
    }`;
    return new Date(fullStr);
  };

  return [...postsArray].sort((a, b) => parseDate(b.date) - parseDate(a.date));
};
