import React from "react";

function Hero() {
  return (
    <div className="container mt-5">
      <div className="row p-5 text-center">
        <h1 className="fs-3 mt-5">Charges</h1>
        <p className="fs-4 text-muted">List of all charges and taxes</p>
        <div className="col"></div>
      </div>
      <div className="row p-5 mt-5 text-center">
        <div className="col-4 p-3">
          <img
            src="media\images\pricing0.svg"
            alt="Pricing0 Img"
            style={{ width: "70%" }}
          />
          <h1 className="fs-2 mt-3">Free equity delivery</h1>
          <p className="text-muted mt-3">
            All equity delivery investments (NSE, BSE), are absolutely free — ₹
            0 brokerage.
          </p>
        </div>
        <div className="col-4 p-3">
          <img
            src="media\images\pricing-eq20.svg"
            alt="Pricing20 Img"
            style={{ width: "70%" }}
          />
          <h1 className="fs-2 mt-3">Intraday and F&O trades</h1>
          <p className="text-muted mt-3">
            Flat ₹ 20 or 0.03% (whichever is lower) per executed order on
            intraday trades across equity, currency, and commodity trades. Flat
            ₹20 on all option trades.
          </p>
        </div>
        <div className="col-4 p-3">
          <img
            src="media\images\pricingMF.svg"
            alt="Pricing0 Img"
            style={{ width: "70%" }}
          />
          <h1 className="fs-2 mt-3">Free direct MF</h1>
          <p className="text-muted mt-3">
            All direct mutual fund investments are absolutely free — ₹ 0
            commissions & DP charges.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
