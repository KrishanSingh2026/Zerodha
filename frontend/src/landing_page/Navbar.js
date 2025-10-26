import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

function Navbar() {
  const [cookies, removeCookie] = useCookies(["token"]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in by checking both cookie and localStorage
  const isLoggedIn = !!(cookies.token || localStorage.getItem("token"));

  const handleLogout = () => {
    // Remove cookie with all possible paths
    removeCookie("token", { path: "/" });
    removeCookie("token", { path: "/", domain: window.location.hostname });

    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Clear any other auth data if exists

    toast.success("Logged out successfully", {
      position: "top-right",
    });

    closeNavbar();

    // Force a re-render by navigating immediately
    navigate("/login", { replace: true });
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className="navbar navbar-expand-lg position-fixed w-100"
      style={{ backgroundColor: "#fff", top: 0, zIndex: 1030 }}
    >
      <div className="container-fluid p-2">
        <Link className="navbar-brand" to="/" onClick={closeNavbar}>
          <img src="media/images/logo.svg" alt="Logo" className="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarSupportedContent"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link"
                aria-current="page"
                to="/"
                onClick={closeNavbar}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={closeNavbar}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/product" onClick={closeNavbar}>
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pricing" onClick={closeNavbar}>
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/support" onClick={closeNavbar}>
                Support
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {isLoggedIn ? (
              <button
                className="btn btn-danger"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-primary"
                  onClick={closeNavbar}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-primary"
                  onClick={closeNavbar}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
