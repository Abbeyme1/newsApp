import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Comment } from "../classes/Comment";
import CommentBuilder from "../components/CommentBuilder";
import { PostsContext, UserContext } from "../helper/Context";
import Style from "./Post.module.css";

const Post = () => {
  const { id } = useParams();
  const [posts, setPosts] = useContext(PostsContext);
  const [user, setUser] = useContext(UserContext);

  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");

  useEffect(() => {
    var p = posts.filter((obj) => obj.id === id)[0];

    // let obj = {
    //   description: Math.random(),
    //   user: new User(),
    // };
    // if (p) {
    //   for (let i = 0; i < 10; i++) p.comments.push(obj);
    // }
    // p[0].comments.push("nice");
    setPost(p);
  }, [posts]);

  useEffect(() => {
    console.log(post);
  }, [post]);

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
    let otherPosts = posts.filter((obj) => obj.id !== id);
    let updatedPosts = [...otherPosts, post];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPost({ ...post });
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
            <span className={Style.heading}>{post.title}</span>

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
              {/* {post.comments?.map((detail, id) => (
                <CommentBuilder
                  detail={detail}
                  key={id}
                  deleteComment={() => deleteComment(detail.id)}
                />
              ))} */}

              {post &&
                post.comments &&
                Object.values(post.comments)?.map((detail, id) => (
                  <CommentBuilder
                    detail={detail}
                    key={id}
                    deleteComment={() => deleteComment(detail.id)}
                  />
                ))}
            </div>
          </div>

          <div className={Style.right}>other posts</div>
        </div>
      )}
    </div>
  );
};

export default Post;
