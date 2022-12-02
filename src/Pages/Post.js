import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Navbar from "../components/Navbar";
import { PostsContext } from "../helper/Context";
import Style from "./Post.module.css";

const Post = () => {
  const { id } = useParams();
  const [posts, setPosts] = useContext(PostsContext);

  const [post, setPost] = useState({});

  useEffect(() => {
    var p = posts.filter((obj) => obj.id === id)[0];

    if (p) {
      for (let i = 0; i < 10; i++) p.comments.push(Math.random());
    }
    // p[0].comments.push("nice");
    setPost(p);
  }, [posts]);

  useEffect(() => {
    console.log(post);
  }, [post]);

  return (
    <div>
      {post && (
        <div className={Style.post}>
          <div className={Style.left}>
            <span className={Style.heading}>{post.title}</span>

            <div className={Style.info}>
              <div>By: {post.postedBy}</div>

              <div>
                <div> {post.likes} 👍🏻</div>
                <div> {post.dislikes} 👎🏻</div>
              </div>
            </div>

            <p> {post.description}</p>

            <div className="comments">
              <p> {post.comments?.length} comments</p>

              {post.comments?.map((comment, id) => (
                <Comment comment={comment} key={id} />
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
