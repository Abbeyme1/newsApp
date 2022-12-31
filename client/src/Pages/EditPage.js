import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PostTemplate from "../components/PostTemplate";
import config from "../config/userConfig";
import { Enum } from "../enums";
import ErrorHandler from "../components/ErrorHandler";

const EditPage = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const [post, setPost] = useState();
  const [error, setError] = useState();
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
      .get(`/posts/${id}`, config)
      .then((res) => {
        setPost(res.data);
      })
      .catch((e) => setError(e.response.data.message));
  };

  let handlePost = (title, description, location, postedBy) => {
    // validate
    post.title = title;
    post.description = description;
    post.location = location;

    // save post
    axios
      .put(
        `/posts/update/${id}`,
        {
          title,
          description,
          location,
        },
        config,
      )
      .then((res) => {
        setPost(res.data);
        navigate(`/post/${id}`);
      })
      .catch((e) => setError(e.response.data.message));
  };

  return (
    <div>
      {!error ? (
        <PostTemplate
          type={Enum.TYPE.EDIT}
          handlePost={handlePost}
          post={post}
        />
      ) : (
        <ErrorHandler error={error} />
      )}
    </div>
  );
};

export default EditPage;
