import React from "react";
import Menu from "./Menu";

const TopBar = ({ username, onLogout }) => {
  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{100.2}</p>
          <p className="percent"></p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{100.2}</p>
          <p className="percent"></p>
        </div>
      </div>

      <Menu username={username} onLogout={onLogout} />

      {username && (
        <div className="desktop-user-section">
          {onLogout && (
            <button className="logout-button" onClick={onLogout}>
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TopBar;
