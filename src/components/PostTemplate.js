import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Enum } from "../enums";

const PostTemplate = ({ type, handlePost, post, error, loading }) => {
  const { user } = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [postedBy, setPostedBy] = useState(Enum.ANONYMOUS);
  const buttonRef = useRef();

  useEffect(() => {
    setTitle(post ? post.title : "");
    setDescription(post ? post.description : "");
    setLocation(post ? post.location : "");
    setPostedBy(post ? post.postedBy : Enum.ANONYMOUS);
  }, [post]);

  useEffect(() => {
    document.addEventListener("keydown", submitOnEnter, true);
  }, []);

  function submitOnEnter(key) {
    if (key.key === "Enter") {
      buttonRef.current.click();
    }
  }

  const submit = () => {
    handlePost(title, description, location, postedBy);
    // clear();
  };

  const clear = () => {
    setTitle("");
    setDescription("");
    setLocation("");
    setPostedBy("");
  };
  return (
    <div>
      {loading && <>loading...</>}
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

      {error && <div style={{ color: "red" }}>{error}</div>}
      <br />
      <button
        ref={buttonRef}
        onClick={submit}
        disabled={!title || !description || !location}
      >
        {type}
      </button>
    </div>
  );
};

export default PostTemplate;
