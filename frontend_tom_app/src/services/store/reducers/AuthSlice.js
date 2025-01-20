import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: false,
    user: null,
    token: null,
    refresh_token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload.resource_owner;
      state.token = action.payload.token;
      state.refresh_token = action.payload.refresh_token;
    },

    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
      state.token = null;
      state.refresh_token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
