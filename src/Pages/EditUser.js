import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext, UsersContext } from "../helper/Context";

const EditUser = () => {
  const { email: userEmail } = useParams();
  const [users, setUsers] = useContext(UsersContext);
  const [user, setUser] = useState();
  const [currentUser, setCurrentUser] = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Edit User";
  }, []);

  useEffect(() => {
    if (currentUser === null || (currentUser && !currentUser?.admin))
      navigate(-1);
  }, [currentUser]);

  useEffect(() => {
    let user = Object.values(users).find((user) => user.email === userEmail);
    setName(user ? user.name : "");
    setEmail(user ? user.email : "");
    setAdmin(user ? user.admin : false);
    setUser(user);
  }, [userEmail, users]);

  const handleEdit = () => {
    // handle email alread exists...

    let prevEmail = user.email;
    user.name = name;
    user.email = email;
    user.admin = admin;

    if (prevEmail !== email) delete users[prevEmail];

    if (userEmail === user.email) {
      setCurrentUser(user);
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
    users[email] = user;
    localStorage.setItem("users", JSON.stringify(users));

    navigate(-1);
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
      <button onClick={handleEdit}>Edit User</button>
    </div>
  );
};

export default EditUser;
