import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setUser as setCurrentUser } from "../redux/features/user/userSlice";
import config from "../config/userConfig";
import ErrorHandler from "../components/ErrorHandler";

const EditUser = () => {
  const { email: userEmail } = useParams();
  const { user: currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buttonRef = useRef();

  useEffect(() => {
    if (currentUser && !currentUser.admin) navigate(-1);

    document.title = "Edit User";
  }, []);

  useEffect(() => {
    getUser();
  }, [userEmail]);

  useEffect(() => {
    if (currentUser === null || (currentUser && !currentUser?.admin))
      navigate(-1);
  }, [currentUser]);

  useEffect(() => {
    setName(user ? user.name : "");
    setEmail(user ? user.email : "");
    setAdmin(user ? user.admin : false);
  }, [user]);

  useEffect(() => {
    document.addEventListener("keydown", editOnEnter, true);
  }, []);

  function editOnEnter(key) {
    if (key.key === "Enter") {
      buttonRef.current.click();
    }
  }

  const getUser = () => {
    setLoading(true);
    axios
      .get(`/user/${userEmail}`, config)
      .then((res) => {
        setUser(res.data);
      })
      .catch((e) => setError(e.response.data.message));
    setLoading(false);
  };

  const handleEdit = () => {
    setLoading(true);
    axios
      .put(`/user/update/${user.email}`, { name, email, admin }, config)
      .then((res) => {
        let updatedUser = res.data;
        if (updatedUser.email === currentUser.email) {
          dispatch(setCurrentUser(updatedUser));
        }

        setUser(updatedUser);
        navigate(-1);
      })
      .catch((e) => setError(e.response.data.message));

    setLoading(false);
  };

  return (
    <>
      {!error ? (
        <div>
          {loading && <>loading...</>}
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
            <span>Admin</span>
            <input
              type="radio"
              id="true"
              name="admin"
              value={admin}
              checked={admin}
              onChange={(e) => {
                setAdmin(true);
              }}
              value={true}
            />
            <label htmlFor="true">True</label>

            <input
              type="radio"
              id="false"
              name="admin"
              value={admin}
              checked={!admin}
              onChange={(e) => {
                setAdmin(false);
              }}
              value={false}
            />
            <label htmlFor="false">false</label>
          </div>
          <br />

          <br />
          <button onClick={handleEdit} ref={buttonRef}>
            Edit User
          </button>
        </div>
      ) : (
        <ErrorHandler error={error} />
      )}
    </>
  );
};

export default EditUser;
