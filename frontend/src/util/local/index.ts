interface StorageUser {
  access_token: String;
  _id: String;
  email: String;
  isAdmin: Boolean;
  isEmailVerified: Boolean;
  firstName: String;
  userId: String;
  lastName: String;
}

export const getUser = () => {
  try {
    const user: StorageUser | null = JSON.parse(localStorage.getItem("user") as string);
    if (user) {
      return user;
    } else {
      return null;
    }
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
