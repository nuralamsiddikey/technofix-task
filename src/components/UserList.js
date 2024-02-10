import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import Dropdown from "react-bootstrap/Dropdown";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import AddUser from "./Modal";
import Spinner from 'react-bootstrap/Spinner';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortby, setSortBy] = useState("firstName");
  const [sortAsc, setSortAsc] = useState(true);
  const [loader,setLoader] = useState(true)

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((result) => {
        setUsers(result.users);
        setLoader(false)
      });
  }, []);

  const filteredAndSortedUser = React.useMemo(() => {
    let filteredData = users || [];

    if (search) {
      const searchQuery = search.toLowerCase();
      filteredData = filteredData.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchQuery) ||
          user.lastName.toLowerCase().includes(searchQuery) ||
          user.email.toLowerCase().includes(searchQuery)
      );
    }

    filteredData.sort((a, b) => {
      const fieldA = a[sortby];
      const fieldB = b[sortby];

      if (typeof fieldA === "string" && typeof fieldB === "string") {
        const comparison = fieldA.localeCompare(fieldB);
        return sortAsc ? comparison : -comparison;
      } else {
        return sortAsc ? fieldA - fieldB : fieldB - fieldA;
      }
    });

    return filteredData;
  }, [users, search, sortby, sortAsc]);


  if(loader) return <div className="text-center mt-4"><Spinner animation="grow" /></div>


  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center justify-content-between pb-3">
        <div className="d-flex gap-4">
          <div
            className={`d-flex align-items-center border  bg-white px-1 rounded-3 mb-2 mb-sm-0`}
          >
            <IoIosSearch className="text-secondary" />
            <input
              className="form-control form-control-sm  border-0 outline-0"
              type="search"
              placeholder="Search user"
              aria-label=".form-control-sm example"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="d-flex align-items-center gap-3">
        <Dropdown>
              <Dropdown.Toggle
                variant="white"
                id="dropdown-basic"
                className="border"
                size="sm"
              >
                {sortAsc ? (
                  <HiSortAscending size={18} />
                ) : (
                  <HiSortDescending size={18} />
                )}
                <span className="fs-6">Sort by</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  href="#/action-1"
                  onClick={() => {
                    if (sortby === "firstName" && sortAsc) setSortAsc(false);
                    else setSortAsc(true);
                    setSortBy("firstName");
                  }}
                >
                  Name
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-2"
                  onClick={() => {
                    if (sortby === "email" && sortAsc) setSortAsc(false);
                    else setSortAsc(true);
                    setSortBy("email");
                  }}
                >
                    
                  Email
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-3"
                  onClick={() => {
                    if (sortby === "company" && sortAsc) setSortAsc(false);
                    else setSortAsc(true);
                    setSortBy("company");
                  }}
                >
                 Company
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
         <AddUser/>
        </div>
      </div>
      <hr />
      <div className="d-flex flex-wrap gap-5 justify-content-center mt-5">
        {filteredAndSortedUser?.map((user) => (
          <Cards user={user} key={user.id}/>
        ))}
      </div>
    </div>
  );
}
