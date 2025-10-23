import React from "react";

function Hero() {
  return (
    <div className="container p-5 text-center mb-3 mt-5">
      <div className="row text-center d-flex justify-content-center align-items-center">
        <img
          src="media/images/homeHero.png"
          alt="Hero Images"
          className="mb-3 mt-5"
          style={{ height: "45vh", width: "70%" }}
        />
        <h1 className="mt-4 fs-3">Invest in everything</h1>
        <p className="fs-4 text-muted">
          Online platform to invest in stocks, derivatives, mutual funds, ETFs,
          bonds, and more.
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

export default Hero;
