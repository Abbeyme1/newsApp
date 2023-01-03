import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Enum } from "../enums";
import Style from "./Post.module.css";

const Post = ({ post }) => {
  const { user } = useSelector((state) => state.user);
  const [ago] = useState(
    Math.round((new Date() - new Date(post.creationTime)) / (1000 * 60)),
  );

  return (
    <div className={Style.post}>
      <div className={Style.header}>
        <div className={Style.heading}> {post.title}</div>
        {post.postedBy !== Enum.ANONYMOUS && (
          <div className={Style.by}> By: {post.postedBy}</div>
        )}
        <div className={Style.ago}>
          {ago >= 60 ? (
            ago / 60 >= 24 ? (
              <p> {Math.round(ago / 60 / 24)}d</p>
            ) : (
              <p> {Math.round(ago / 60)}h</p>
            )
          ) : (
            <p>{ago}min</p>
          )}
        </div>
      </div>
      <div className={Style.footer}>
        <div className={Style.comments}>
          {Object.values(post.comments).length} Comments{" "}
        </div>
        <div className={Style.readMore}>
          {" "}
          <Link to={`/post/${post.id}`}>Read More</Link>
        </div>
        {user?.admin && (
          <>
            <div className={Style.readMore}>
              {" "}
              <Link to={`/post/${post.id}/edit`}>Edit</Link>
            </div>
            <div className={Style.readMore}>
              {" "}
              <Link to={`/post/${post.id}/delete`}>Delete</Link>
            </div>
          </>
        )}
      </div>

      {/* location */}
    </div>
  );
};

export default Post;
