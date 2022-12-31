import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "../components/Comments";
import Recommend from "../components/Recommend";
import config from "../config/userConfig";
import Style from "./Post.module.css";
import ErrorHandler from "../components/ErrorHandler";

const Post = () => {
  const { id } = useParams();
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.user);
  const buttonRef = useRef();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");
  const [error, setError] = useState();

  useEffect(() => {
    document.title = `${post ? post.title : "Loading.."}`;
  }, [post, id]);

  useEffect(() => {
    getPost();
  }, [id]);

  useEffect(() => {
    document.addEventListener("keydown", submitOnEnter, true);
  }, []);

  function submitOnEnter(key) {
    if (key.key === "Enter") {
      buttonRef.current.click();
    }
  }

  let getPost = () => {
    axios
      .get(`/posts/${id}`, config)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => setError(err.response.data.message));
  };

  let handleLike = () => {
    if (user)
      axios
        .post(`/posts/${id}/like`, null, config)
        .then((res) => {
          setPost(res.data);
        })
        .catch((err) => setError(err.response.data.message));
  };

  let handleDislike = () => {
    if (user)
      axios
        .post(`/posts/${id}/dislike`, null, config)
        .then((res) => {
          setPost(res.data);
        })
        .catch((err) => setError(err.response.data.message));
  };

  let handleCancel = () => {
    setComment("");
  };

  let handlePostComment = () => {
    if (user)
      axios
        .post(
          `/posts/${id}/comment`,
          {
            comment: comment,
          },
          config,
        )
        .then((res) => {
          setPost(res.data);
        })
        .catch((err) => setError(err.response.data.message));

    setComment("");
  };

  var deleteComment = (commentId) => {
    if (user)
      axios
        .delete(`/posts/${id}/comment/${commentId}`, config)
        .then((res) => {
          setPost(res.data);
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
  };

  return (
    <div>
      {post && (
        <>
          <div className={Style.post}>
            <div className={Style.left}>
              <div className={Style.header}>
                <div className={Style.heading}>{post.title}</div>
                {user?.admin && (
                  <div onClick={() => navigate(`edit`)}> ⚙️ </div>
                )}
                {/* <div> ✍🏻 ⚙️ ✏️🖌️</div> */}
              </div>
              <div className={Style.info}>
                <div>By: {post.postedBy}</div>

                <div>
                  <button
                    className={Style.like}
                    disabled={!user}
                    onClick={handleLike}
                  >
                    {post.likes && Object.keys(post.likes).length} 👍🏻
                  </button>
                  <button
                    className={Style.dislike}
                    disabled={!user}
                    onClick={handleDislike}
                  >
                    {post.dislikes && Object.keys(post.dislikes).length} 👎🏻
                  </button>
                </div>
              </div>

              <div className={Style.description}> {post.description}</div>

              <div className={Style.comments}>
                <p>
                  {" "}
                  {post.comments && Object.keys(post.comments).length} comments
                </p>

                <div>
                  {user && (
                    <div>
                      {" "}
                      <input
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                      ></input>
                      <button
                        ref={buttonRef}
                        disabled={!comment}
                        onClick={handlePostComment}
                      >
                        Comment
                      </button>
                      <button onClick={handleCancel}>Cancel</button>
                    </div>
                  )}
                </div>

                <Comments
                  post={post}
                  deleteComment={deleteComment}
                  user={user}
                />
              </div>
            </div>

            <div className={Style.right}>
              <Recommend posts={posts} id={id} />
            </div>
          </div>

          <ErrorHandler error={error} />
        </>
      )}
    </div>
  );
};

export default Post;
