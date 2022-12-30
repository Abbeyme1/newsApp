import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login as loginAction } from "../../redux/features/user/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buttonRef = useRef();
  const {
    user,
    loading,
    loginError: error,
  } = useSelector((state) => state.user);

  useEffect(() => {
    document.title = "Login";
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", loginOnEnter, true);
  }, []);

  function loginOnEnter(key) {
    if (key.key === "Enter") {
      buttonRef.current.click();
    }
  }

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  // useEffect(() => {}, [errors]);

  let login = () => {
    dispatch(loginAction({ email, password }));
    clear();
  };

  let clear = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      {loading && <>loading....</>}
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

        <br />
        <br />
        {error && (
          <span style={{ color: "red" }} data-testid="error">
            {" "}
            {error}
          </span>
        )}
      </div>
      <br />

      <div>
        {" "}
        <Link to="/signup">Don't have an account ? </Link>
      </div>
      <br />
      <button ref={buttonRef} onClick={login} disabled={!email || !password}>
        Login
      </button>
      <br />
      <br />
    </div>
  );
};

export default Login;
