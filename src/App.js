import { useEffect, useState } from "react";
import "./App.css";
import CreatePost from "./Pages/CreatePost";
import { PostsContext } from "./helper/Context";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import Post from "./Pages/Post";
import Navbar from "./components/Navbar";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("posts")) {
      setPosts(JSON.parse(localStorage.getItem("posts")));
    }
  }, []);

  return (
    <PostsContext.Provider value={[posts, setPosts]}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<CreatePost />}></Route>
        <Route path="/post/:id" element={<Post />}></Route>
      </Routes>
    </PostsContext.Provider>
  );
}

export default App;
