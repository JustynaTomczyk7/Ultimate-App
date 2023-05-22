import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isUserAuthenticated: boolean;
}

const initialState: AuthState = {
  isUserAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isUserAuthenticated = true;
    },
    logout: (state) => {
      state.isUserAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
