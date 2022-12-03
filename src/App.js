import { useEffect, useState } from "react";
import "./App.css";
import CreatePost from "./Pages/CreatePost";
import { PostsContext, UserContext, UsersContext } from "./helper/Context";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import Post from "./Pages/Post";
import Navbar from "./components/Navbar";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Logout from "./Pages/Logout";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState({});

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
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/create" element={<CreatePost />}></Route>
            <Route path="/post/:id" element={<Post />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
          </Routes>
        </UserContext.Provider>
      </UsersContext.Provider>
    </PostsContext.Provider>
  );
}

export default App;
