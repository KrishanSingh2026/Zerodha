import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import API_URL from "../config";
import "./auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  // Redirect if already logged in
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (cookies.token || localToken) {
      navigate("/", { replace: true });
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
    if (!email || !password) {
      handleError("Please fill in all fields");
      return;
    }

    try {
      const { data } = await axios.post(
        `${API_URL}/login`, // Use API_URL
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message, token } = data; //  Get token from response

      if (success) {
        // Save token to localStorage
        if (token) {
          localStorage.setItem("token", token);
        }

        handleSuccess(`Welcome back!`);
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
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="auth-page-wrapper">
      <div className="form_container">
        <h2>Login to Dashboard</h2>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
              required
            />
          </div>
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to={"/signup"}>Signup</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
