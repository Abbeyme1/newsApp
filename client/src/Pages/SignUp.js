import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp as signUpAction } from "../redux/features/user/userSlice";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const buttonRef = useRef();
  const navigate = useNavigate();
  const {
    user,
    loading,
    signUpError: error,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Signup";
  }, []);

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  useEffect(() => {
    document.addEventListener("keydown", signUpOnEnter, true);
  }, []);

  function signUpOnEnter(key) {
    if (key.key === "Enter") {
      buttonRef.current.click();
    }
  }

  let clear = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  let createUser = () => {
    dispatch(signUpAction({ name, email, password }));
    clear();
  };
  return (
    <div>
      {loading && <>loading...</>}
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
      <button
        ref={buttonRef}
        onClick={createUser}
        disabled={!name || !email || !password}
      >
        Register
      </button>
    </div>
  );
};

export default SignUp;
