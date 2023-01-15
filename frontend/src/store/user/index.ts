import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "todos",
  initialState: {
    user: {},
  },
  reducers: {
    getUser: (state) => {
      const user = localStorage.getItem("user");
      if (user) {
        state.user = JSON.parse(user);
      }
    },
    // setUser: (state)=>{
    //   localStorage.setItem("user", user);
    // }
  },
});

export const removeUser = () => {
  localStorage.removeItem("user");
};

export const setUser = (data: string) => {
  localStorage.setItem("user", data);
};


export const { getUser } = userSlice.actions;
export default userSlice.reducer;
