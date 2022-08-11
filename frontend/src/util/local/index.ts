export const getUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") as string);
    return user;
  } catch (error) {
    return null;
  }
};

export const removeUser = () => {
  localStorage.removeItem("user");
};

export const setUser = (data: string) => {
  localStorage.setItem("user", data);
};
