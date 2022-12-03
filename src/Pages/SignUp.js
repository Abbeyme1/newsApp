import { clear } from "@testing-library/user-event/dist/clear";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../classes/User";
import Post from "../components/Post";
import { Enum } from "../enums";
import { PostsContext, UserContext, UsersContext } from "../helper/Context";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [users, setUsers] = useContext(UsersContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  let clear = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  let createUser = () => {
    if (users[email]) {
      console.log("user already exists");
      clear();
      return;
    }
    let newUser = new User(name, email, password);

    let updatedUsers = {
      ...users,
      [newUser.email]: newUser,
    };

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("user", JSON.stringify(newUser));

    setUser(newUser);
    setUsers(updatedUsers);
  };
  return (
    <div>
      <div>
        <span> Name </span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <span> Email </span>

        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div>
        <span> Password </span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <br />

      <div>
        {" "}
        <Link to="/login">Already have an account ? </Link>
      </div>
      <br />
      <button onClick={createUser}>Register</button>
    </div>
  );
};

export default SignUp;
