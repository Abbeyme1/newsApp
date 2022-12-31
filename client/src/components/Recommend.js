import React from "react";
import { Link } from "react-router-dom";
import Style from "./Recommend.module.css";

const Recommend = ({ posts, id }) => {
  return (
    <div>
      <span>Recommended Posts</span>
      {Object.values(posts)
        .filter((post) => post.id !== id)
        .slice(0, 5)
        .map((post) => (
          <Link to={`/post/${post.id}`} key={post.id}>
            <div className={Style.recommend}>{post.title}</div>
          </Link>
        ))}
    </div>
  );
};

export default Recommend;
