import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

export default function Details() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  const [user, setUser] = useState({});
  const [loader,setLoader] = useState(true)

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setUser(result);
        setLoader(false)
      });
  }, [id]);


 if(loader) return <div className="text-center mt-4"><Spinner animation="grow" /></div>

  return (
    <div className="container mt-5 p-5">
      <Link to="/" className="text-decoration-none fw-bold d-inline-block mb-2">
        Back
      </Link>
      <div className="row">
        <div className="col-4">
          <div>
            <div class="card cursor-pointer text-decoration-none">
              <img src={user?.image} />
              <div class="card-body">
                <h5 class="card-title">
                  {user?.firstName} {user?.lastName}
                </h5>
                <p>{user?.company?.name}</p>
                <p>{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div>
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
                  <td>{user?.address?.state}</td>
                  <td>{user?.address?.city}</td>
                  <td>{user?.address?.postalCode}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
