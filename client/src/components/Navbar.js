import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserContext } from "../helper/Context";
import Style from "./Navbar.module.css";
import Search from "./Search";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className={Style.navbar}>
      <div className={Style.left}>
        <div>
          <Link to="/">
            <img
              className={Style.logo}
              src={require("../images/news.jpg")}
              alt="News"
            />
          </Link>
        </div>
      </div>
      <div className={Style.middle}>
        <Search />
      </div>
      <div className={Style.right}>
        {user?.admin && (
          <>
            <div>
              <Link to="/users">Users</Link>
            </div>
          </>
        )}

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
