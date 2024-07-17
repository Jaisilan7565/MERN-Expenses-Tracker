import { createSlice } from "@reduxjs/toolkit";

// Initial state
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("userInfo")) || null,
  },
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    logoutAction: (state, action) => {
      state.user = null;
    },
  },
});

// Generate the Actions
export const { loginAction, logoutAction } = authSlice.actions;

//Generate the Reducers
const authReducer = authSlice.reducer;
export default authReducer;
