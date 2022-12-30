import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PostsContext } from "../helper/Context";

const DeletePost = () => {
  const { id } = useParams();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user || !user.admin) navigate("/");

    document.title = "Delete Post";
    deletePost();
    // navigate("/");
  }, []);

  const deletePost = () => {
    axios
      .delete(`/posts/${id}`, {
        userId: user.email,
      })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.message);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      });
  };

  return (
    <div>
      {error ? (
        <div>
          <span style={{ fontSize: "25px", color: "red" }}>{error}</span>
          <br />
          Redirecting back to home page...
        </div>
      ) : (
        <>Deleting post..</>
      )}
    </div>
  );
};

export default DeletePost;
