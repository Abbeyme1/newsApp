import React, { useContext, useState } from "react";
import { UserContext } from "../helper/Context";
import Style from "./CommentBuilder.module.css";

const CommentBuilder = ({ detail, deleteComment }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [user] = useContext(UserContext);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div
      className={Style.comment}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div>
        <div>
          <b>{detail.email}</b>
        </div>
        <div>{detail.comment}</div>
      </div>

      <div>
        {user && (user.email === detail.email || user.admin) && isHovering && (
          <button onClick={() => deleteComment()}>-</button>
        )}
      </div>
    </div>
  );
};

export default CommentBuilder;
