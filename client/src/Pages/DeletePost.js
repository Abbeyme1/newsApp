import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ErrorHandler from "../components/ErrorHandler";
import config from "../config/userConfig";

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
      .delete(`/api/posts/${id}`, config())
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
          <ErrorHandler error={error} />
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
