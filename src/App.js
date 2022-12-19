import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import CreatePost from "./Pages/CreatePost";
import {
  PostsContext,
  SearchContext,
  UserContext,
  UsersContext,
} from "./helper/Context";
import { Route, Routes } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
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
  const [posts, setPosts] = useState({});
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    // get posts from db
    if (localStorage.getItem("posts")) {
      setPosts(JSON.parse(localStorage.getItem("posts")));
    }

    // get user from local storage if present
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    // get users from db
    if (localStorage.getItem("users")) {
      setUsers(JSON.parse(localStorage.getItem("users")));
    }
  }, []);

  return (
    <PostsContext.Provider value={[posts, setPosts]}>
      <UsersContext.Provider value={[users, setUsers]}>
        <UserContext.Provider value={[user, setUser]}>
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
        </UserContext.Provider>
      </UsersContext.Provider>
    </PostsContext.Provider>
  );
}

export default App;
