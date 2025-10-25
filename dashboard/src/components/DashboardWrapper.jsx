import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import API_URL from "../config";
import Home from "./Home";

const DashboardWrapper = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyCookie = async () => {
      // Check localStorage instead of cookies
      const token = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");

      if (!token) {
        console.log("No token found, redirecting to login");
        navigate("/login");
        return;
      }

      // If we have both token and username in localStorage, use them directly
      if (token && storedUsername) {
        console.log("Using stored credentials");
        setUsername(storedUsername);
        setIsVerified(true);

        toast.success(`Welcome back, ${storedUsername}!`, {
          position: "top-right",
          autoClose: 2000,
        });
        return;
      }

      //Verify with backend
      try {
        console.log("Verifying with backend...");
        const { data } = await axios.post(
          `${API_URL}/`,
          {},
          { withCredentials: true }
        );

        console.log("Backend response:", data);

        const { status, user } = data;

        if (status) {
          setUsername(user);
          setIsVerified(true);

          toast.success(`Welcome back, ${user}!`, {
            position: "top-right",
            autoClose: 2000,
          });
        } else {
          console.log("Backend returned status false");
          removeCookie("token");
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          navigate("/login");
        }
      } catch (error) {
        console.error("Backend verification error:", error);
        removeCookie("token");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
      }
    };

    verifyCookie();
  }, [navigate, removeCookie]);

  const handleLogout = () => {
    console.log("Logging out...");
    removeCookie("token", { path: "/" });
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    toast.info("Logging out...", {
      position: "top-right",
      autoClose: 1000,
    });

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  if (!isVerified) {
    console.log("Showing loading screen");
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #00d4ff",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <h3 style={{ color: "#666", fontWeight: "500" }}>
          Loading your dashboard...
        </h3>
      </div>
    );
  }

  return (
    <>
      <Home username={username} onLogout={handleLogout} />
      <ToastContainer />
    </>
  );
};

export default DashboardWrapper;
