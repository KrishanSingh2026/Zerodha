import React from "react";

function Pricing() {
  return (
    <div className="container">
      <div className="row p-3">
        <div className="col-5 p-5">
          <h2 className="mb-3 text-dark fs-2">Unbeatable pricing</h2>
          <p
            className="mb-4 text-muted"
            style={{ fontSize: "16px", lineHeight: "1.5" }}
          >
            We pioneered the concept of discount broking and price
            <br />
            transparency in India. Flat fees and no hidden charges.
          </p>
          <a
            href="#"
            className="text-primary text-decoration-none"
            style={{ fontSize: "16px" }}
          >
            See pricing &nbsp;
            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
        <div className="col-7 p-5 mb-5">
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <img
                src="media/images/pricing0.svg"
                alt="pricingEquity Img"
                style={{ width: "55%" }}
              />
              <p
                className="mb-0 text-muted"
                style={{ fontSize: "12px", lineHeight: "1.2", width: "50%" }}
              >
                Free account
                <br />
                opening
              </p>
            </div>

            <div className="d-flex align-items-center mx-3">
              <img
                src="media/images/pricing0.svg"
                alt="pricingEquity Img"
                style={{ width: "55%" }}
              />
              <p
                className="mb-0 text-muted"
                style={{ fontSize: "12px", lineHeight: "1.2", width: "50%" }}
              >
                Free equity delivery
                <br />
                and direct mutual funds
              </p>
            </div>

            <div className="d-flex align-items-center">
              <img
                src="media/images/pricing-eq20.svg"
                alt="pricingEquity20 Img"
                style={{ width: "55%" }}
              />
              <p
                className="mb-0 text-muted"
                style={{ fontSize: "12px", lineHeight: "1.2", width: "50%" }}
              >
                Intraday and
                <br />
                F&O
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
