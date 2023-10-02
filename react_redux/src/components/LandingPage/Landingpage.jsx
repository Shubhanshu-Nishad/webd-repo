import React from "react";
import "./Landingpage.css";
import { FcFullTrash, FcEditImage, FcViewDetails } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
const Landingpage=()=> {
  const navigate=useNavigate();
  const gotoApp=()=>{
    navigate('/home');
  }
  return (
    <>
      <div className="d-flex mt-5 justify-content-center align-items-center landing-page-container">
        <div className="card" style={{ width: "40rem" }}>
          <div className="card-body">
            <h5 className="card-title">Hi there!!!</h5>
            <h6 className="card-subtitle mb-2 text-muted">Welcome to the User Information App</h6>
            <p className="card-text ct">
              <ol>
                <h4>
                  This User Information App have following features : 
                </h4>
                <li>Add User Data</li>
                <li>Update User Data by clicking on <FcEditImage/> icon</li>
                <li>View User data by clicking on <FcViewDetails/> icon (in modale)</li>
                <li>Delete User data by clicking on <FcFullTrash/> icon</li>
                <li>Session storage is added to prevent data lost on refresh</li>
              </ol>
            </p>
            <button className="btn btn-primary" onClick={gotoApp}>Go to App</button>
          </div>
        </div>
      </div>
      <div className="bgImage"></div>
    </>
  );
}

export default Landingpage;