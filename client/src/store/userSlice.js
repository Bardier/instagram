import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    name: "",
    email: "",
    password: "",
    avatar: "",
    followers: [],
  },
  setUser: (state, action) => {
    state = action.payload;
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;