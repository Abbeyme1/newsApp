import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../classes/User";
import Post from "../components/Post";
import { Enum } from "../enums";
import { PostsContext, UserContext, UsersContext } from "../helper/Context";
import { CustomError } from "../classes/CustomError";
import Style from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [users, setUsers] = useContext(UsersContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  useEffect(() => {}, [errors]);

  let login = () => {
    // setErrors([]);
    // if (email.length === 0 || password) {
    //   setErrors({
    //     ...errors,
    //     [Enum.EMAIL]: new CustomError("Enter Email", Enum.EMAIL),
    //   });
    // }

    // if (password.length === 0)
    //   setErrors({
    //     ...errors,
    //     [Enum.PASSWORD]: new CustomError("Enter Password", Enum.PASSWORD),
    //   });

    let user = users[email];
    if (user) {
      if (user.password === password) {
        console.log("yes");
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      } else {
        console.log("no");
        setPassword("");
      }
    } else {
      console.log("user doesn't exists");
      // setErrors({
      //   ...errors,
      //   [Enum.GENERAL]: new CustomError("User doesn't exists ", Enum.GENERAL),
      // });
    }
  };
  return (
    <div>
      <div>
        <span> Email </span>

        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        {/* {errors && errors[Enum.EMAIL] && (
          <div key={errors[Enum.EMAIL].message} className={Style.error}>
            {errors[Enum.EMAIL].message}
          </div>
        )} */}
      </div>

      <div>
        <span> Password </span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* {errors && errors[Enum.PASSWORD] && (
          <div key={errors[Enum.PASSWORD].message} className={Style.error}>
            {errors[Enum.PASSWORD].message}
          </div>
        )} */}
      </div>
      <br />

      <div>
        {" "}
        <Link to="/signup">Don't have an account ? </Link>
      </div>
      <br />
      <button onClick={login}>Login</button>

      <br />
      <br />

      {/* {errors && errors[Enum.GENERAL] && (
        <div key={errors[Enum.GENERAL].message} className={Style.error}>
          {errors[Enum.GENERAL].message}
        </div>
      )} */}
    </div>
  );
};

export default Login;
