import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import usersReducer from "../features/users/usersSlice";
import postsReducer from "../features/posts/postsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    posts: postsReducer,
  },
  middleware: (gDM) => gDM({ serializableCheck: false }),
});

export default store;
