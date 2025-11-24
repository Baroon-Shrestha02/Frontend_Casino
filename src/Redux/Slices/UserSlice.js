import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // when login starts
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // when login succeeds
    signInSuccess: (state, action) => {
      state.currentUser = action.payload; // user object
      state.loading = false;
      state.error = null;
    },
    // when login fails
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // when user logs out
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    // clear error manually
    clearError: (state) => {
      state.error = null;
    },
    // update user data (profile edit, etc.)
    updateUserSuccess: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  clearError,
  updateUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;

// optional selectors
export const selectUser = (state) => state.user.currentUser;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;
