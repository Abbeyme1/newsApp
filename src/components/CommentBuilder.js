import React, { useContext, useState } from "react";
import { UserContext } from "../helper/Context";
import Style from "./CommentBuilder.module.css";

const CommentBuilder = ({ detail, deleteComment }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [user, setUser] = useContext(UserContext);

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
      <div> {detail.comment} </div>

      <div>
        {user && user.email === detail.email && isHovering && (
          <button onClick={() => deleteComment()}>-</button>
        )}
      </div>
    </div>
  );
};

export default CommentBuilder;
