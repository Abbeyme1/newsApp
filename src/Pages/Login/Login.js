import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext, UsersContext } from "../../helper/Context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [users] = useContext(UsersContext);
  const navigate = useNavigate();
  // const [errors] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    document.title = "Login";
  }, []);

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  // useEffect(() => {}, [errors]);

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
    setError();
    if (user) {
      if (user.password === password) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      } else {
        setError("Something went wrong. Try again.");
        setEmail("");
        setPassword("");
      }
    } else {
      setError("Something went wrong. Try again.");
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

        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* {errors && errors[Enum.EMAIL] && (
          <div key={errors[Enum.EMAIL].message} className={Style.error}>
            {errors[Enum.EMAIL].message}
          </div>
        )} */}
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

        {/* {errors && errors[Enum.PASSWORD] && (
          <div key={errors[Enum.PASSWORD].message} className={Style.error}>
            {errors[Enum.PASSWORD].message}
          </div>
        )} */}

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
      <button onClick={login} disabled={!email || !password}>
        Login
      </button>

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
