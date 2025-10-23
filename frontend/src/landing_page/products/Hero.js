import React from "react";

function Hero() {
  return (
    <div className="container mt-5">
      <div className="row text-center p-5 border-bottom">
        <h2 className="mt-5">Zerodha Products</h2>
        <h4 className="text-muted p-3 fs-5">
          Sleek, modern, and intuitive trading platforms
        </h4>
        <p className="mb-5">
          Check out our{" "}
          <a
            href="https://zerodha.com/investments"
            style={{ textDecoration: "none", fontWeight: "500" }}
          >
            investment offerings{" "}
            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>{" "}
          </a>
        </p>
      </div>
    </div>
  );
}

export default Hero;
