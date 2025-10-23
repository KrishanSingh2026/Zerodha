import React from "react";

function RightSection({
  imageURL,
  productName,
  productDescription,
  learnMore,
}) {
  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-5 p-5">
          <h3 className="mb-3">{productName}</h3> <br />
          <p>{productDescription}</p>
          <div>
            <a href={learnMore} style={{ textDecoration: "none" }}>
              Learn More{" "}
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <div className="col-7 text-center">
          <img src={imageURL} alt="imageURL" />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
