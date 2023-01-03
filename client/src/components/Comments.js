import React, { useCallback, useEffect, useState } from "react";
import CommentBuilder from "./CommentBuilder";

const Comments = ({ post, deleteComment, user }) => {
  const [comments, setComments] = useState([]);

  const handleComments = () => {
    let comments = [];

    Object.entries(post.comments).map((obj) => comments.push(obj[1]));

    comments.sort((a, b) => {
      let ca = a.creationTime;
      let cb = b.creationTime;
      ca = new Date(ca);
      cb = new Date(cb);

      if (user) {
        if (a.email === b.email && a.email === user.email) return cb - ca;
        else if (a.email === user.email) return 1;
        else if (b.email === user.email) return -1;
      }

      return cb - ca;
    });

    setComments(comments);
  };

  const cb = useCallback(() => {
    if (post && post.comments) handleComments();
  }, [post]);

  useEffect(() => {
    cb();
  }, [post]);

  // useEffect(() => {
  //   if (post && post.comments) handleComments();
  // }, [post]);

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

      {post && post.comments ? (
        comments.map((detail) => (
          <CommentBuilder
            detail={detail}
            key={detail.id}
            deleteComment={() => deleteComment(detail.id)}
          />
        ))
      ) : (
        <>loading...</>
      )}
    </>
  );
};

export default Comments;
