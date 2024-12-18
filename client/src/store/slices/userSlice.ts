import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    displayName: "user-user",
    name: "user-user",
    bio: "user-user",
    profileImg: "../../../public/images/profile-image-holder.svg",
    pronouns: "user-user",
    links: "user-user",
    banners: "user-user",
    music: "user-user",
    showThreadsBadge: false,
    gender: "user-user",
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload;
    },
    setProfilePicUser: (state, action) => {
      state.profileImg = action.payload;
    },
    setDisplayName: (state, action) => {
      state.displayName = action.payload;
    },
    setBio: (state, action) => {
      state.bio = action.payload;
    },
    setPronouns: (state, action) => {
      state.pronouns = action.payload;
    },
    setLinks: (state, action) => {
      state.links = action.payload;
    },
    setBanners: (state, action) => {
      state.banners = action.payload;
    },
    setMusic: (state, action) => {
      state.music = action.payload;
    },
    setShowThreadsBadge: (state, action) => {
      state.showThreadsBadge = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
  },
});

export const {
  setUser,
  setProfilePicUser,
  setDisplayName,
  setBio,
  setPronouns,
  setLinks,
  setBanners,
  setMusic,
  setShowThreadsBadge,
  setGender,
} = userSlice.actions;

export default userSlice.reducer;
