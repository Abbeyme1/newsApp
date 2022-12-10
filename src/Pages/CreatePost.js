import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../classes/Post";
import PostTemplate from "../components/PostTemplate";
import { Enum } from "../enums";
import { PostsContext } from "../helper/Context";

const CreatePost = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useContext(PostsContext);

  useEffect(() => {
    document.title = "CreatePost";
  }, []);

  let handlePost = (title, description, location, postedBy) => {
    // validate

    let post = new Post(title, description, location, postedBy);
    posts[post.id] = post;
    setPosts(posts);
    localStorage.setItem("posts", JSON.stringify(posts));
    // REDIRECT TO HOME
    navigate("/");
  };

  let getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      // console.log("Latitude is :", position);
      // displayLocation(position.coords.latitude, position.coords.longitude);
    });
  };

  return <PostTemplate type={Enum.TYPE.CREATE} handlePost={handlePost} />;
};

export default CreatePost;
