import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container p-3 mt-5">
      <div className="row p-5">
        <div className="col-5">
          <img src={imageURL} alt="imageURL" />
        </div>
        <div className="col-2"></div>
        <div className="col-5 p-5 mt-3">
          <h3 style={{ marginBottom: "1.4rem" }}>{productName}</h3>
          <p style={{ lineHeight: "2" }}>{productDescription}</p>
          <div style={{ marginBottom: "1.6rem" }}>
            <a
              href={tryDemo}
              style={{ textDecoration: "none", fontWeight: "500" }}
            >
              Try Demo <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
            <a
              href={learnMore}
              style={{
                marginLeft: "5rem",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Learn More{" "}
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>

          <div className="mt-3">
            <a href={googlePlay}>
              <img
                src="media\images\googlePlayBadge.svg"
                alt="googlePlayBadge img"
              />
            </a>
            <a href={appStore} style={{ marginLeft: "3rem" }}>
              <img
                src="media\images\appstoreBadge.svg"
                alt="appstoreBadge img"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
