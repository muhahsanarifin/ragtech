export const body = (body) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(body);
    },500)
  });
};
