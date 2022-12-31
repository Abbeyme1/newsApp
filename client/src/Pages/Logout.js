import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser as logout } from "../redux/features/user/userSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Logout";
    dispatch(logout());
    navigate("/");
  }, []);

  return <div>Logging out..</div>;
};

export default Logout;
