import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  users: localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : {},
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
