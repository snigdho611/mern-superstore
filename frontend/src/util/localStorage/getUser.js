const getUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  } catch (error) {
    return null;
  }
};

export default getUser;
