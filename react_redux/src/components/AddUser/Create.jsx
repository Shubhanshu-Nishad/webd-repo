import React, { useState } from "react";
import { addUser } from "../../store/slices/CreateSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null); // State to store the selected image file
  const [hobbies, setHobbies] = useState("");
  const [description, setDescription] = useState("");
  const users = useSelector((state) => state.users.userList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "" && !/^[a-zA-Z\s]+$/.test(name)) {
      toast.error("Please enter a valid Name");
    } else if (name.length < 3) {
      toast.error("Name length should be greater than 3");
    } else if (email.trim() === "") {
      toast.error("Please enter Email");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      toast.error("Email is not valid");
    } else if (phone.trim() === "") {
      toast.error("Please enter Phone");
    } else if (!/^[0-9]{10}$/.test(phone)) {
      toast.error("Phone Number is not valid");
    } else if (description.trim() === "") {
      toast.error("Please enter your description");
    } else if (description.trim().length < 15) {
      toast.error("Descripition length should be greater than 15 characters");
    } else if (hobbies.trim() === "") {
      toast.error("Please enter your hobbies");
    } else {
      dispatch(
        addUser({
          id: users.length,
          name: name,
          email: email,
          phone: phone,
          image: image,
          hobbies: hobbies,
          description: description,
        })
      );
      navigate("/home");
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="form-container">
        <h3>Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name*"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Email*"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              placeholder="Phone*"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              name="image"
              className="form-control"
              onChange={handleImageChange} // Handle the image file change
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              type="text"
              name="description"
              className="form-control"
              placeholder="Description*"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="hobbies">Hobbies:</label>
            <input
              type="text"
              name="hobbies"
              className="form-control"
              placeholder="Hobbies*  e.g.(cricket,coding etc)"
              onChange={(e) => setHobbies(e.target.value)}
            />
          </div>
          <button className="btn btn-info">Submit</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Create;






