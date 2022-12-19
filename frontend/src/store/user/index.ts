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
  },
});

export const { getUser } = userSlice.actions;
export default userSlice.reducer;
