import React, { useEffect, useMemo, useState } from "react";
import CommentBuilder from "./CommentBuilder";

const Comments = ({ post, deleteComment, user }) => {
  const [comments, setComments] = useState([]);

  const handleComments = () => {
    let comments = [];

    Object.entries(post.comments).map((obj) => {
      let comment = obj[1];

      if (comment.email === user.email) comments.unshift(comment);
      else comments.push(comment);
    });

    setComments(comments);
  };

  useEffect(() => {
    if (post && post.comments) handleComments();
  }, [post]);

  return (
    <>
      {/* {post &&
        post.comments &&
        Object.values(post.comments)?.map((detail) => (
          <CommentBuilder
            detail={detail}
            key={detail.id}
            deleteComment={() => deleteComment(detail.id)}
          />
        ))} */}

      {post &&
        post.comments &&
        comments.map((detail) => (
          <CommentBuilder
            detail={detail}
            key={detail.id}
            deleteComment={() => deleteComment(detail.id)}
          />
        ))}
    </>
  );
};

export default Comments;
