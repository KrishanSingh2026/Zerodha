import React from "react";

const Apps = () => {
  return (
    <div className="apps-container">
      <div className="apps">
        <img src="logo.png" style={{ width: "80px" }} alt="logo img" />
        <h4>Kite</h4>
        <p>Trading platform</p>
      </div>
      <div className="apps">
        <img src="console.svg" style={{ width: "80px" }} alt="console img" />
        <h4>Console</h4>
        <p>Backoffice</p>
      </div>
      <div className="apps">
        <img
          src="kite-connect.svg"
          style={{ width: "80px" }}
          alt="kite-connect img"
        />
        <h4>Kite Connect</h4>
        <p>Trading APIs</p>
      </div>
      <div className="apps">
        <img src="coin.svg" style={{ width: "80px" }} alt="coin img" />
        <h4>Coin</h4>
        <p>Mutual funds</p>
      </div>
    </div>
  );
};

export default Apps;
