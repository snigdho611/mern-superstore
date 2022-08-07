export const getUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  } catch (error) {
    return null;
  }
};

export const removeUser = () => {
  localStorage.removeItem("user");
};

export const setUser = (data) => {
  localStorage.setItem("user", data);
};
