import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    cookie: "",
    name: "",
    profileImg: "/default-user-profile.svg",
    role: "adopter",
    userId: "",
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
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const {
  setUser,
  setProfilePicUser,
  setGlobalCookie,
  setRole,
  setUserId,
} = userSlice.actions;

export default userSlice.reducer;
