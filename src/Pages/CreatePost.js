import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../classes/Post";
import { Enum } from "../enums";
import { PostsContext, UserContext } from "../helper/Context";

const CreatePost = () => {
  const navigate = useNavigate();
  const [user] = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [postedBy, setPostedBy] = useState(Enum.ANONYMOUS);
  const [posts, setPosts] = useContext(PostsContext);

  let handlePost = () => {
    // validate

    let post = new Post(title, description, location, postedBy);
    let updatedPosts = [...posts, Object(post)];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    // REDIRECT TO HOME
    navigate("/");
  };

  let getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      // console.log("Latitude is :", position);
      // displayLocation(position.coords.latitude, position.coords.longitude);
    });
  };

  return (
    <div>
      <div>
        <span> Title </span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <span> Description </span>
        <br />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div>
        <span> location </span>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div>
        <span>postedBy</span>
        <select
          name="postedBy"
          value={postedBy}
          onChange={(e) => setPostedBy(e.target.value)}
        >
          <option value={Enum.ANONYMOUS}>Anonymous</option>
          {user && <option>{user.name}</option>}
        </select>
      </div>

      <br />
      <br />
      <button onClick={handlePost}>Create Post</button>
    </div>
  );
};

export default CreatePost;
