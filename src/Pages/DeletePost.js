import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostsContext } from "../helper/Context";

const DeletePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useContext(PostsContext);
  useEffect(() => {
    document.title = "Delete Post";
    delete posts[id];
    setPosts(posts);
    localStorage.setItem("posts", JSON.stringify(posts));
    navigate("/");
  }, []);

  return <div>Logging out..</div>;
};

export default DeletePost;
