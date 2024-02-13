import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  password: null,
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    auth: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isAuth = true;
    },
    logout: (state, action) => {
      state.email = null;
      state.password = null;
      state.isAuth = false;
    },
  },
});

export const { auth, logout } = userSlice.actions;

export default userSlice.reducer;
