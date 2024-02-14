import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuth: false,
  isLoading: false,
  response: null,
  error: null,
};

export const login = createAsyncThunk("user/login", async (formValue) => {
  if (!formValue.username || !formValue.password) {
    throw new Error("Please provide username and password");
  }
  var formData = new FormData();

  formData.append("username", formValue.username);
  formData.append("password", formValue.password);
  const response = await axios
    .post("http://192.168.1.8/note_backend/login", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err.response.data.message);
    });
});

export const register = createAsyncThunk("user/register", async (formValue) => {
  if (!formValue.username || !formValue.password || !formValue.email) {
    throw new Error("Lütfen alanları bos bırakmayınız.");
  }
  var formData = new FormData();
  formData.append("username", formValue.username);
  formData.append("password", formValue.password);
  formData.append("email", formValue.email);
  const response = await axios
    .post("http://192.168.1.8/note_backend/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch((err) => {
      throw new Error(err.response.data.message);
    });

  if (response.status === 200) {
    return response.data;
  }
});

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
    reset: (state) => {
      state.isLoading = false;
      state.isAuth = false;
      state.response = null;
      state.error = null;
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
        state.isAuth = false;
        state.response = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = action.error.message;
      });
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        console.log(action);
        state.response = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = action.error.message;
      });
  },
});

export const { auth, logout, reset } = userSlice.actions;

export default userSlice.reducer;
