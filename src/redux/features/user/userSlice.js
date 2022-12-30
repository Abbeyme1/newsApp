import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  signUpError: null,
  loginError: null,
};

export const login = createAsyncThunk(
  "user/login",
  async (user, { rejectWithValue }) => {
    const { email, password } = user;

    return axios
      .post("/user/login", {
        email,
        password,
      })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data.message));
  },
);

export const signUp = createAsyncThunk(
  "user/signUp",
  async (user, { rejectWithValue }) => {
    const { name, email, password } = user;
    return axios
      .post("/user/signup", {
        name,
        email,
        password,
      })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data.message));
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    removeUser: (state) => {
      state.loading = false;
      state.user = null;
      localStorage.setItem("user", null);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.loginError = action.payload;
    });
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.signUpError = action.payload;
    });
  },
});

export default userSlice.reducer;
export const { setUser, removeUser } = userSlice.actions;
