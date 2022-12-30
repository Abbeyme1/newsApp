import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import CreatePost from "./Pages/CreatePost";
import { SearchContext } from "./helper/Context";
import { Route, Routes } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import { useDispatch } from "react-redux";
import { fetchPosts } from "./redux/features/posts/postsSlice";
const Home = React.lazy(() => import("./Pages/Home"));
const Post = React.lazy(() => import("./Pages/Post"));
const Navbar = React.lazy(() => import("./components/Navbar"));
const Login = React.lazy(() => import("./Pages/Login/Login"));
const SignUp = React.lazy(() => import("./Pages/SignUp"));
const Logout = React.lazy(() => import("./Pages/Logout"));
const EditPage = React.lazy(() => import("./Pages/EditPage"));
const DeletePost = React.lazy(() => import("./Pages/DeletePost"));
const Users = React.lazy(() => import("./Pages/Users"));
const EditUser = React.lazy(() => import("./Pages/EditUser"));

function App() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  // fetch posts
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      <Suspense fallback={<LoadingScreen />}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create" element={<CreatePost />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/post/:id" element={<Post />}></Route>
          <Route path="/post/:id/edit" element={<EditPage />}></Route>
          <Route path="/post/:id/delete" element={<DeletePost />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/user/:email/edit" element={<EditUser />}></Route>
        </Routes>
      </Suspense>
    </SearchContext.Provider>
  );
}

export default App;
