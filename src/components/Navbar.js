import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../helper/Context";
import Style from "./Navbar.module.css";

const Navbar = () => {
  const [user] = useContext(UserContext);

  return (
    <div className={Style.navbar}>
      <div className={Style.left}>
        <div>
          <Link to="/">
            <img className={Style.logo} src={require("../images/news.jpg")} />
          </Link>
        </div>
      </div>
      <div className={Style.right}>
        <div>
          <Link to="/create">Create Post</Link>
        </div>

        {user === null ? (
          <div>
            {" "}
            <div>
              <Link to="/login">Login</Link>
            </div>
            <div>
              <Link to="/signup">Register</Link>
            </div>
          </div>
        ) : (
          <div>
            <Link to="/logout">Logout</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
