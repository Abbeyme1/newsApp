import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UsersContext } from "../helper/Context";

const Users = () => {
  const [users, setUsers] = useContext(UsersContext);
  return (
    <div>
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
    </div>
  );
};

export default Users;
