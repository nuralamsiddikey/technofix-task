import React from "react";
import { Link} from "react-router-dom";



export default function Cards({ user }) {
 
  return (
    <Link
      class="card cursor-pointer text-decoration-none"
      style={{ width: "18rem" }}
      to={`/user?id=${user.id}`}
    >
      <img src={user.image} />
      <div class="card-body">
        <h5 class="card-title">
          {user.firstName} {user.lastName}
        </h5>
        <p className="">{user.email}</p>
        <p className="bg-light">{user?.company?.name}</p>
        <table className="table table-borderless">
          <thead>
            <tr>
              <th>State</th>
              <th>City</th>
              <th>Suit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.address.state}</td>
              <td>{user.address.city}</td>
              <td>{user.address.postalCode}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Link>
  );
}
