import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link } from "react-router-dom";
import { deleteUser } from "../../store/slices/CreateSlice";
import { useNavigate } from "react-router-dom";
import { FcFullTrash, FcEditImage, FcViewDetails } from "react-icons/fc";
import { Modal } from "react-bootstrap";
import "./Home.css";

const Home = () => {
  const users = useSelector((state) => state.users.userList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(deleteUser({ id: id }));
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="header">
        <p>User Information</p>
      </nav>
      <div className="container">
        <div className={`fixed-button-container ${scrolled ? "scrolled" : ""}`}>
          <Link
            to="/create"
            className={`btn btn-success my-3 fixed-button ${
              scrolled ? "scrolled" : ""
            }`}
          >
            Add User +
          </Link>
        </div>
        <div className="card-container">
          {users.map((user) => (
            <div key={user.id} className="card">
              <img
                src={user.image}
                className="card-img-top"
                alt="User"
              />
              <div className="card-body">
                <h5 className="card-title">User Details</h5>
                <p>
                  <span>Name:</span> {user.name}
                </p>
                <p>
                  <span>Email:</span> {user.email}
                </p>
                <Link to={`/edit/${user.id}`} className="btn-primary edit">
                  <FcEditImage />
                </Link>
                <a
                  onClick={() => handleDelete(user.id)}
                  className="btn-danger delete"
                >
                  <FcFullTrash />
                </a>
                <a
                  className="btn-primary edit"
                  onClick={() => openModal(user)}
                >
                  <FcViewDetails />
                </a>
              </div>
            </div>
          ))}
        </div>

        {users.length === 0 && (
          <div className="error">
            <h1>Please Add User Data First</h1>
          </div>
        )}

        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUser && (
              <div>
                <img src={selectedUser.image} alt="NO Image Chosen" className="image" />
                <p>
                  <span>Name:</span> {selectedUser.name}
                </p>
                <p>
                  <span>Email:</span> {selectedUser.email}
                </p>
                <p>
                  <span>Phone No:</span> {selectedUser.phone}
                </p>
                <p>
                  <span>Description:</span> {selectedUser.description}
                </p>
                <p>
                  <span>Hobbies:</span> {selectedUser.hobbies}
                </p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={closeModal}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Home;

