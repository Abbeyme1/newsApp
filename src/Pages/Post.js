import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "../components/Comments";
import Recommend from "../components/Recommend";
import Style from "./Post.module.css";

const Post = () => {
  const { id } = useParams();
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.user);
  const buttonRef = useRef();

  const navigate = useNavigate();

  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");

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
      .get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((e) => console.log(e));
  };

  let handleLike = () => {
    if (user)
      axios
        .post(`/posts/${id}/like`, { userId: user.email })
        .then((res) => {
          setPost(res.data);
        })
        .catch((err) => console.log(err));
  };

  let handleDislike = () => {
    if (user)
      axios
        .post(`/posts/${id}/dislike`, { userId: user.email })
        .then((res) => {
          setPost(res.data);
        })
        .catch((err) => console.log(err));
  };

  let handleCancel = () => {
    setComment("");
  };

  let handlePostComment = () => {
    if (user)
      axios
        .post(`/posts/${id}/comment`, {
          name: user.name,
          email: user.email,
          comment: comment,
        })
        .then((res) => {
          setPost(res.data);
          setComment("");
        })
        .catch((err) => console.log(err));
  };

  var deleteComment = (commentId) => {
    if (user)
      axios
        .delete(`/posts/${id}/comment`, {
          data: {
            userId: user.email,
            commentId,
          },
        })
        .then((res) => {
          setPost(res.data);
        })
        .catch((err) => console.log(err));
  };

  return (
    <div>
      {post && (
        <div className={Style.post}>
          <div className={Style.left}>
            <div className={Style.header}>
              <div className={Style.heading}>{post.title}</div>
              {user?.admin && <div onClick={() => navigate(`edit`)}> ⚙️ </div>}
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

              {/* {post &&
                post.comments &&
                Object.values(post.comments)?.map((detail) => (
                  <CommentBuilder
                    detail={detail}
                    key={detail.id}
                    deleteComment={() => deleteComment(detail.id)}
                  />
                ))} */}

              <Comments post={post} deleteComment={deleteComment} user={user} />
            </div>
          </div>

          <div className={Style.right}>
            <Recommend posts={posts} id={id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
