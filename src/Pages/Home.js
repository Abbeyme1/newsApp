import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import { PostsContext } from "../helper/Context";

const Home = () => {
  const [posts, setPosts] = useContext(PostsContext);

  return (
    <div>
      {posts ? (
        posts.map((post, index) => <Post key={index} post={post} />)
      ) : (
        <h2>No Posts Available</h2>
      )}
    </div>
  );
};

export default Home;
