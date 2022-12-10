import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Enum } from "../enums";
import { PostsContext, UserContext } from "../helper/Context";

const PostTemplate = ({ type, handlePost, post }) => {
  const [user] = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [postedBy, setPostedBy] = useState(Enum.ANONYMOUS);

  useEffect(() => {
    setTitle(post ? post.title : "");
    setDescription(post ? post.description : "");
    setLocation(post ? post.location : "");
    setPostedBy(post ? post.postedBy : Enum.ANONYMOUS);
  }, [post]);
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
        {type === Enum.TYPE.CREATE && (
          <>
            <span>postedBy</span>
            <select
              name="postedBy"
              value={postedBy}
              onChange={(e) => setPostedBy(e.target.value)}
            >
              <option value={Enum.ANONYMOUS}>Anonymous</option>
              {user && <option>{user.name}</option>}
            </select>
          </>
        )}
      </div>

      <br />
      <br />
      <button
        onClick={() => handlePost(title, description, location, postedBy)}
      >
        {type}
      </button>
    </div>
  );
};

export default PostTemplate;
