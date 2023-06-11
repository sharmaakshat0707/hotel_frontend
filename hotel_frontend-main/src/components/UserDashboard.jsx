import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "../css/UserDashboard.css";
import { getAllUsers } from "../services/UserService";
import { Link } from "react-router-dom";
// Import the getAllUsers service

export default function UserDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState([]); // State to store the user data

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      if (
        location.state?.isLoggedIn !== true ||
        location.state?.role !== "USER"
      ) {
        localStorage.clear();
        navigate("/login");
      }
    } else {
      localStorage.clear();
      navigate("/login");
    }

    const fetchData = async () => {
      try {
        const response = await getAllUsers(localStorage.getItem("token")); // Call the getAllUsers service
        const loggedInUser = await response.data.filter((userData) => {
          return userData.username === localStorage.getItem("userName");
        });
        console.log(loggedInUser, location.state.userName); // Find the logged-in user from the response data
        setUser(loggedInUser); // Set the user data in the state
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <div className="user-details">
          <h5>Welcome</h5>
          <h4>{user[0]?.firstName}</h4>
        </div>
        <div className="user-line"></div>
        <div className="user-info">
          <h5>Personal Information</h5>
        </div>
        <div className="user-information">
          <div className="container user-container">
            <div className="row align-items-start user-row">
              <div className="col">First Name:</div>
              <div className="col">{user[0]?.firstName}</div>
            </div>
          </div>
          <div className="container user-container">
            <div className="row align-items-start">
              <div className="col">Last Name:</div>
              <div className="col">{user[0]?.lastName}</div>
            </div>
          </div>
          <div className="container user-container">
            <div className="row align-items-start">
              <div className="col">Email:</div>
              <div className="col">{user[0]?.email}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
