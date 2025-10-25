import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import API_URL from "../config";
import "./auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;

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

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${API_URL}/signup`,
        {
          email: email.trim(),
          password,
          username: username.trim(),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Signup response:", data);

      if (data.success) {
        // Save token to localStorage
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        handleSuccess(data.message || "Account created successfully!");

        // Clear form
        setInputValue({
          email: "",
          password: "",
          username: "",
        });

        // Navigate after delay
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
      } else {
        handleError(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);

      // Handle different error scenarios
      if (error.response) {
        // Server responded with error status
        const errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          `Error: ${error.response.status}`;
        handleError(errorMessage);
      } else if (error.request) {
        handleError("No response from server. Please check your connection.");
      } else {
        handleError(error.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
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
