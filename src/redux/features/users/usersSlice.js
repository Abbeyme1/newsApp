import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  users: localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : {},
  error: null,
};

export const login = createAsyncThunk("user/login", (data) => {
  console.log(data);
});

export const signUp = createAsyncThunk("user/signup", (data) => {
  const { name, email, password } = data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
export const {} = usersSlice.actions;
