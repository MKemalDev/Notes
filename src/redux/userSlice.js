import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuth: false,
  isLoading: false,
  user: null,
  error: null,
};

export const login = createAsyncThunk(
  "user/login",
  async (username, password) => {
    if (!username || !password) {
      throw new Error("Please provide username and password");
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    await axios
      .post("http://192.168.1.8/note_backend/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
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
