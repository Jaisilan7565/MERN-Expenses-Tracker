export const getUserFromStorage = () => {
  const user = JSON.parse(localStorage.getItem("userInfo") || null);
  return user?.token;
};
