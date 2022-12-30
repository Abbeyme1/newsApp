import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setUser as setCurrentUser } from "../redux/features/user/userSlice";

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
      .get(`/user/${userEmail}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((e) => console.log(e.message));
    setLoading(false);
  };

  const handleEdit = () => {
    setLoading(true);
    axios
      .put(`/user/update/${user.email}`, { name, email, admin })
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

      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default EditUser;
