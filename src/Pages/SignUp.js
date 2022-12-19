import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../classes/User";
import { UserContext, UsersContext } from "../helper/Context";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [users, setUsers] = useContext(UsersContext);
  const navigate = useNavigate();
  const [error, setError] = useState();

  useEffect(() => {
    document.title = "Signup";
  }, []);

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
      setError("user already exists");
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
          placeholder="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <span> Email </span>

        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <span> Password </span>
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <br />

      {error && (
        <span style={{ color: "red" }} data-testid="error">
          {" "}
          {error}
        </span>
      )}

      <br />
      <br />

      <div>
        {" "}
        <Link to="/login">Already have an account ? </Link>
      </div>
      <br />
      <button onClick={createUser} disabled={!name || !email || !password}>
        Register
      </button>
    </div>
  );
};

export default SignUp;
