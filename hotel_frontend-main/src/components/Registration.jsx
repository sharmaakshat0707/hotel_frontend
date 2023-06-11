import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/UserService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/Registration.css";

const Registration = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
    // email: ''
    email: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    register(data)
      .then((res) => {
        toast.success("Registration Successful", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        toast.error("User with this username already exists!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const handleSignUpClick = () => {
    navigate("/login"); // Navigate to the register component
  };

  return (
    <div>
      <ToastContainer />
      <div className="bg">
        <div className="firstOne">
          <div className="content">
            <h1>Create an Account</h1>
            <br />
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  First Name
                </span>
                <input
                  style={{ color: "Black" }}
                  type="text"
                  className="form-control"
                  placeholder="Enter First Name"
                  name="firstName"
                  value={data.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Last Name
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Last Name"
                  name="lastName"
                  value={data.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  UserName
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Username"
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  City
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter City Name"
                  name="city"
                  value={data.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Email
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Password
                </span>
                <input
                  type="password"
                  className="form-control"
                  name = "password"
                  placeholder="Enter Password"
                  aria-label="password"
                  value = {data.password}
                  aria-describedby="basic-addon1"
                  onChange={handleChange}
                  required
                />
              </div>
              <br />
              <button type="submit" className="registerButton">
                Register
              </button>
              <br />
              <br />
            </form>
          </div>
        </div>
        <div className="secondtwo">
          <div className="conn">
            <h2>Already have an account?</h2>
            <br />
            <p>Login and explore the platform!</p>
            <br />
            <button onClick={handleSignUpClick} className="mb-3">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;