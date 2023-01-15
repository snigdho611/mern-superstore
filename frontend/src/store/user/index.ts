import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user"),
  },
  reducers: {
    getUser: (state: any) => {
      const user = localStorage.getItem("user");
      if (user) {
        state.user = JSON.parse(user);
      }
    },
    setUser: (state, action: PayloadAction<string>) => {
      localStorage.setItem("user", action.payload);
    },
    removeUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    }
  },
});

export const { getUser, setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
