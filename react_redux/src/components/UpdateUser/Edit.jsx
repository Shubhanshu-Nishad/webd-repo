import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../../store/slices/CreateSlice";
import { useDispatch } from "react-redux";
import "./Edit.css";

const Edit = () => {
  const { id } = useParams();

  const users = useSelector((state) => state.users.userList);
  const existingUser = users.find((user) => user.id.toString() === id);
  const [username, setUserName] = useState(existingUser.name);
  const [useremail, setUserEmail] = useState(existingUser.email);
  const [userphone, setUserPhone] = useState(existingUser.phone);
  const [image, setImage] = useState(null); 
  const [imagePreview, setImagePreview] = useState(existingUser.image); 
  const [userdescription, setUserDescription] = useState(existingUser.description);
  const [userhobbies, setUserHobbies] = useState(existingUser.hobbies);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id: id,
        name: username,
        email: useremail,
        phone: userphone,
        image: imagePreview,
        hobbies: userhobbies,
        description: userdescription
      })
    );
    navigate("/home");
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="form-container">
        <h3>Update User</h3>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name*"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email*"
              value={useremail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              placeholder="Phone*"
              value={userphone}
              onChange={(e) => setUserPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              name="image"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              type="text"
              name="description"
              className="form-control"
              placeholder="Description*"
              value={userdescription}
              onChange={(e) => setUserDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="hobbies">Hobbies:</label>
            <input
              type="text"
              name="hobbies"
              className="form-control"
              placeholder="Description*"
              value={userhobbies}
              onChange={(e) => setUserHobbies(e.target.value)}
            />
          </div>
          <button className="btn btn-info update">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Edit;

