import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Post } from "../classes/Post";
import PostTemplate from "../components/PostTemplate";
import { Enum } from "../enums";
import { PostsContext, UserContext } from "../helper/Context";

const EditPage = () => {
  const { id } = useParams();
  const [user] = useContext(UserContext);
  const [posts, setPosts] = useContext(PostsContext);
  const [post, setPost] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Edit Post";
  }, []);

  useEffect(() => {
    if (user === null || (user && !user?.admin)) navigate(-1);
  }, [user]);

  useEffect(() => {
    var p = Object.values(posts).find((obj) => obj.id === id);
    setPost(p);
  }, [id]);

  let handlePost = (title, description, location, postedBy) => {
    // validate
    post.title = title;
    post.description = description;
    post.location = location;

    posts[post.id] = post;
    setPosts(posts);
    setPost(post);
    localStorage.setItem("posts", JSON.stringify(posts));
    // REDIRECT TO HOME
    navigate(`/post/${id}`);
  };

  return (
    <div>
      <PostTemplate type={Enum.TYPE.EDIT} handlePost={handlePost} post={post} />
    </div>
  );
};

export default EditPage;
