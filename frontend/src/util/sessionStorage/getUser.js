const getUser = () => {
  try {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return user;
  } catch (error) {
    return null;
  }
};

export default getUser;
