import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import API_URL from "../config";
import "./auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;

  // Redirect if already logged in
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (cookies.token || localToken) {
      navigate("/");
    }
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password || !username) {
      handleError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      handleError("Password must be at least 6 characters");
      return;
    }

    try {
      const { data } = await axios.post(
        `${API_URL}/signup`, // FIXED: Use API_URL
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      const { success, message, token } = data; // Get token from response

      if (success) {
        // Save token to localStorage
        if (token) {
          localStorage.setItem("token", token);
        }

        handleSuccess(`Welcome! Account created successfully!`);
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
      handleError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }

    setInputValue({
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="auth-page-wrapper">
      <div className="form_container">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
              required
            />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              placeholder="Enter your username"
              onChange={handleOnChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
              required
              minLength="6"
            />
          </div>
          <button type="submit">Sign Up</button>
          <span>
            Already have an account? <Link to={"/login"}>Login</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
