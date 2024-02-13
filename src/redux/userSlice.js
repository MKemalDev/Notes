import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  isLoading: false,
  user: null,
  error: null,
};

export const login = createAsyncThunk(
  "user/login",
  async (username, password) => {
    try {
      if (!username || !password) {
        throw new Error("Please provide username and password");
      }
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = action.error.message;
      });
  },
});

export const { auth, logout } = userSlice.actions;

export default userSlice.reducer;
