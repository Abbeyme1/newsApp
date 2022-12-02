import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Enum } from "../enums";
import Style from "./Post.module.css";

const Post = ({ post }) => {
  const [ago, setAgo] = useState(
    Math.round((new Date() - new Date(post.creationTime)) / (1000 * 60)),
  );

  return (
    <div className={Style.post}>
      <div className={Style.header}>
        <div className={Style.heading}> {post.title}</div>
        {post.postedBy === Enum.ANONYMOUS && (
          <div className={Style.by}> By: {post.postedBy}</div>
        )}
        <div className={Style.ago}>
          {ago >= 60 ? <p> {Math.round(ago / 60)}h </p> : <p>{ago}min</p>}
        </div>
      </div>
      <div className={Style.footer}>
        <div className={Style.comments}>{post.comments.length} Comments </div>
        <div className={Style.readMore}>
          {" "}
          <Link to={`/post/${post.id}`}>Read More</Link>
        </div>
      </div>

      {/* location */}
    </div>
  );
};

export default Post;
