import React from "react";

function Universe() {
  return (
    <div className="container mt-3 p-5">
      <div className="row text-center ">
        <h1 className="mt-5 fs-3">The Zerodha Universe</h1>
        <p className="mt-3 fs-5 mb-5">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
        <div className="col-4 p-3">
          <img
            src="media\images\zerodhaFundhouse.png"
            alt="Zerodha Fundhouse Img"
            style={{ width: "50%", marginBottom: "1rem" }}
          />
          <p className="text-small text-muted">
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
          <img
            src="media\images\streak-logo.png"
            alt="Streak Logo Img"
            style={{ width: "50%" }}
            className="mt-5"
          />
          <p className="text-small text-muted mt-3">
            Systematic trading platform that allows you to create and backtest
            strategies without coding.
          </p>
        </div>
        <div className="col-4 p-3">
          <img
            src="media\images\sensibullLogo.svg"
            alt="Sensibull Logo Img"
            style={{ width: "60%", marginBottom: "1rem" }}
          />
          <p className="text-small text-muted mb-5">
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more.
          </p>
          <img
            src="media\images\smallcaseLogo.png"
            alt="Smallcase LogoImg"
            style={{ width: "50%" }}
            className="mt-5"
          />
          <p className="text-small text-muted mt-3">
            Thematic investing platform that helps you invest in diversified
            baskets of stocks on ETFs.
          </p>
        </div>
        <div className="col-4 p-3">
          <img
            src="media\images\tijori.svg"
            alt="Tijori Img"
            style={{ width: "39%", marginBottom: "1rem" }}
          />
          <p className="text-small text-muted mb-5">
            Investment research platform that offers detailed insights on
            stocks, sectors, supply chains, and more.
          </p>
          <img
            src="media\images\dittoLogo.png"
            alt="Ditto Img"
            style={{ width: "35%" }}
            className="mt-5"
          />
          <p className="text-small text-muted mt-3">
            Personalized advice on life and health insurance. No spam and no
            mis-selling. Sign up for free
          </p>
        </div>
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

export default Universe;
