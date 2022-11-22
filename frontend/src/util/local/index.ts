interface StorageUser {
  access_token: string;
  _id: string;
  email: string;
  isAdmin: Boolean;
  isEmailVerified: Boolean;
  firstName: string;
  userId: string;
  lastName: string;
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
