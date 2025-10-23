import React from "react";

function Hero() {
  return (
    <div className="w-100 mb-5" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="container">
        <div className="row p-5 mt-5">
          <div className="col-6 mt-5">
            <h1 className="mt-5">Support Portal</h1>
          </div>
          <div className="col-6 d-flex justify-content-end align-items-center">
            <a
              href=" "
              className="btn fw-medium mt-5"
              role="button"
              style={{
                height: "40px",
                width: "110px",
                backgroundColor: "#397DD0",
                color: "#fff",
              }}
            >
              My tickets
            </a>
          </div>
        </div>

        <div className="px-5 pb-5">
          <div
            className="d-flex align-items-center bg-white border rounded"
            style={{ padding: "15px 20px" }}
          >
            <i className="fa-solid fa-magnifying-glass text-muted me-3"></i>
            <input
              type="text"
              className="border-0 bg-transparent flex-grow-1"
              placeholder="Eg: How do I open my account, How do i activate F&O..."
              style={{
                outline: "none",
                fontSize: "16px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
