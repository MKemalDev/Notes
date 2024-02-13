import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  password: null,
  isLoading: false,
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
