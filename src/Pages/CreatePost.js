import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostTemplate from "../components/PostTemplate";
import { Enum } from "../enums";

const CreatePost = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "CreatePost";
  }, []);

  const createPost = async (post) => {
    const { title, description, location, postedBy } = post;

    return axios
      .post("/posts/", {
        title,
        description,
        location,
        postedBy,
      })
      .then((res) => {
        return res.data;
      });
  };

  let handlePost = async (title, description, location, postedBy) => {
    // validate
    setLoading(true);
    try {
      const resp = await createPost({ title, description, location, postedBy });
      navigate("/");
    } catch (e) {
      setError(e.response.data.message);
    }
    setLoading(false);

    // console.log(createPostError === null);
    // if (createPostError === null) navigate("/");

    // let post = new Post(title, description, location, postedBy);
    // posts[post.id] = post;
    // setPosts(posts);
    // localStorage.setItem("posts", JSON.stringify(posts));
    // REDIRECT TO HOME

    // navigate("/");
  };

  let getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      // console.log("Latitude is :", position);
      // displayLocation(position.coords.latitude, position.coords.longitude);
    });
  };

  return (
    <PostTemplate
      type={Enum.TYPE.CREATE}
      handlePost={handlePost}
      loading={loading}
      error={error}
    />
  );
};

export default CreatePost;
