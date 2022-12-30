import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PostTemplate from "../components/PostTemplate";
import { Enum } from "../enums";

const EditPage = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const [post, setPost] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Edit Post";
    getPost();
  }, [id]);

  useEffect(() => {
    if (user === null || (user && !user?.admin)) navigate(-1);
  }, [user]);

  let getPost = () => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      })
      .catch((e) => console.log(e));
  };

  let handlePost = (title, description, location, postedBy) => {
    // validate
    post.title = title;
    post.description = description;
    post.location = location;

    // save post
    axios
      .put(`/posts/update/${id}`, {
        title,
        description,
        location,
      })
      .then((res) => {
        setPost(res.data);
        navigate(`/post/${id}`);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <PostTemplate type={Enum.TYPE.EDIT} handlePost={handlePost} post={post} />
    </div>
  );
};

export default EditPage;
