import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, [cookies.token]);

  const checkAuth = () => {
    const token = cookies.token || localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setLoading(false);
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    setCookie("token", token, { path: "/", maxAge: 86400 }); // 24 hours
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Remove from both storage locations
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    removeCookie("token", { path: "/" });

    // Clear any other auth data
    sessionStorage.clear();

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
