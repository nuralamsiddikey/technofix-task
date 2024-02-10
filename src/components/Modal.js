import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function AddUser() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "A",
    state: "A",
    city: "A",
    postalCode: "",
  });

  const handleClose = () => {
    setShow(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      company: "A",
      state: "A",
      city: "A",
      postalCode: "",
    });
  };

  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = () => {
    fetch("https://dummyjson.com/users/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User added successfully:", data);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });

    handleClose();
  };

  return (
    <>
      <button className="btn btn-primary text-nowrap" onClick={handleShow}>
        Add new
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>First name</label>
          <input
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <label>Last name</label>
          <input
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <label>Email</label>
          <input
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <label>Company</label>
          <select
            className="form-control"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
          >
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
          </select>
          <label>State</label>
          <select
            className="form-control"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          >
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
          </select>
          <label>City</label>
          <select
            className="form-control"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          >
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
          </select>
          <label>Postal code</label>
          <input
            className="form-control"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddUser;
