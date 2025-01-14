import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: false,
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
    },

    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
