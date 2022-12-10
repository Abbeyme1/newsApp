import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../helper/Context";

const Logout = () => {
  const navigate = useNavigate();
  const [_, setUser] = useContext(UserContext);
  useEffect(() => {
    document.title = "Logout";
    setUser(null);
    localStorage.setItem("user", null);
    navigate("/");
  }, []);

  return <div>Logging out..</div>;
};

export default Logout;
