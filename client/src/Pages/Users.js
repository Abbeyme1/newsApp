import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import config from "../config/userConfig";

const Users = () => {
  const [users, setUsers] = useState();
  const [error, setError] = useState();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !user.admin) navigate(-1);
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get("/api/user", config())
      .then((res) => {
        let obj = {};
        res.data.forEach((user) => {
          obj[user.email] = user;
        });

        setUsers(obj);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <div>
      {!error ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {users &&
              Object.values(users).map((user) => (
                <tr key={user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.admin ? "✅" : "❌"}</td>
                  <td>
                    <Link to={`/user/${user.email}/edit`}>Edit</Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div style={{ fontSize: "20px", color: "red" }}>{error}</div>
      )}
    </div>
  );
};

export default Users;
