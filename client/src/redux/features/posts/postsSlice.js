import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../../config/userConfig";

const initialState = {
  loading: null,
  posts: {},
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    return axios
      .get("/posts", config)
      .then((res) => {
        let obj = {};
        res.data.forEach((post) => {
          obj[post.id] = post;
        });

        return obj;
      })
      .catch((e) => rejectWithValue(e.response.data.message));
  },
);
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      const post = action.payload;
      state.posts[post.id] = post;
    },
    deletePost: (state, action) => {
      const post = action.payload;
      delete state.posts[post.id];
    },
    updatePost: (state, action) => {
      const post = action.payload;
      state.posts[post.id] = post;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default postsSlice.reducer;
export const { addPost, deletePost, updatePost } = postsSlice.actions;
