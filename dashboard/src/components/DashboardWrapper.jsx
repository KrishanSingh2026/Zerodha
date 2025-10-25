import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Home from "./Home";

const DashboardWrapper = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.post(
          "http://localhost:3002/",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;

        if (status) {
          setUsername(user);
          setIsVerified(true);

          // Show welcome toast only once
          toast.success(`Welcome back, ${user}!`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        removeCookie("token");
        navigate("/login");
      }
    };

    verifyCookie();
  }, [cookies.token, navigate, removeCookie]);

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    toast.info("Logging out...", {
      position: "top-right",
      autoClose: 1000,
    });
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  if (!isVerified) {
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
