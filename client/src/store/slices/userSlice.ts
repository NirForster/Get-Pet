import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    cookie: "",
    name: "user",
    profileImg: "/default-user-profile.svg",
  },
  reducers: {
    setGlobalCookie: (state, action) => {
      state.cookie = action.payload;
    },
    setUser: (state, action) => {
      state.name = action.payload;
    },
    setProfilePicUser: (state, action) => {
      state.profileImg = action.payload;
    },
  },
});

export const { setUser, setProfilePicUser, setGlobalCookie } =
  userSlice.actions;

export default userSlice.reducer;
