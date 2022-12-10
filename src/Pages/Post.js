import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Comment } from "../classes/Comment";
import CommentBuilder from "../components/CommentBuilder";
import Comments from "../components/Comments";
import { PostsContext, UserContext } from "../helper/Context";
import Style from "./Post.module.css";

const Post = () => {
  const { id } = useParams();
  const [posts, setPosts] = useContext(PostsContext);
  const [user] = useContext(UserContext);
  const navigate = useNavigate();

  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");

  useEffect(() => {
    document.title = `${post ? post.title : "Loading.."}`;
  }, [post]);

  useEffect(() => {
    let p = Object.values(posts).find((obj) => {
      return obj.id === id;
    });
    setPost(p);
  }, [posts, id]);

  let handleLike = () => {
    if (post.likes) {
      if (!post.likes[user.email]) {
        delete post.dislikes[user.email]; // if disliked
        post.likes[user.email] = true;
      } else delete post.likes[user.email];
    }
    updatedPosts();
  };

  let handleDislike = () => {
    if (post.dislikes) {
      if (!post.dislikes[user.email]) {
        delete post.likes[user.email]; // if liked
        post.dislikes[user.email] = true;
      } else delete post.dislikes[user.email];
    }

    updatedPosts();
  };

  let updatedPosts = () => {
    posts[id] = post;
    setPost({ ...post });
    setPosts(posts);
    localStorage.setItem("posts", JSON.stringify(posts));
  };

  let handleCancel = () => {
    setComment("");
  };

  let handlePostComment = () => {
    let userComment = new Comment(user.name, user.email, comment);
    post.comments[userComment.id] = userComment;
    setComment("");
    updatedPosts();
  };

  var deleteComment = (id) => {
    delete post.comments[id];
    updatedPosts();
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
                    <button onClick={handlePostComment}>Comment</button>
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
        </div>
      )}
    </div>
  );
};

export default Post;
