import React from "react";

function OpenAccount() {
  return (
    <div className="container p-5 text-center mb-5">
      <div className="row text-center d-flex justify-content-center align-items-center">
        <h1 className="mt-4 fs-3">Open a Zerodha account</h1>
        <p className="my-3 text-muted">
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
          F&O trades.
        </p>
        <button
          className="p-2 btn btn-primary fs-5 mt-3"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Sign up for free
        </button>
      </div>
    </div>
  );
}

export default OpenAccount;
