import React from "react";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = ({ username, onLogout }) => {
  return (
    <>
      <TopBar username={username} onLogout={onLogout} />
      <Dashboard />
    </>
  );
};

export default Home;
