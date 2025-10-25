import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const ProtectedRoute = ({ children }) => {
  const [cookies] = useCookies(["token"]);
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      //Check BOTH cookies AND localStorage
      const hasCookieToken = !!cookies.token;
      const hasLocalStorageToken = !!localStorage.getItem("token");
      const hasToken = hasCookieToken || hasLocalStorageToken;

      console.log("Token in cookies:", hasCookieToken);
      console.log("Token in localStorage:", hasLocalStorageToken);
      console.log("User authenticated:", hasToken);

      if (hasToken) {
        setIsAuthenticated(true);
        console.log("User authenticated");
      } else {
        setIsAuthenticated(false);
        console.log("User NOT authenticated - will redirect to login");
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [cookies.token]);

  if (isChecking) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("Redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  console.log("Rendering protected content");
  return children;
};

export default ProtectedRoute;
