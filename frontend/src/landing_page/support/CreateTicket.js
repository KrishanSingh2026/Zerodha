import React, { useState } from "react";

function CreateTicket() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const sections = [
    {
      id: "account-opening",
      title: "Account Opening",
      icon: "fa-solid fa-circle-plus",
      color: "#E0F7FF99",
      items: [
        "Resident individual",
        "Minor",
        "Non Resident Indian (NRI)",
        "Company, Partnership, HUF and LLP",
        "Glossary",
      ],
    },
    {
      id: "your-zerodha-account",
      title: "Your Zerodha Account",
      icon: "fa fa-user-circle",
      color: "#E0F7FF99",
      items: [
        " Your Profile",
        "Account modification",
        "Client Master Report (CMR) and Depository Participant (DP)",
        "Nomination",
        "Transfer and conversion of securities",
      ],
    },
    {
      id: "kite",
      title: "Kite",
      icon: "fa-solid fa-circle-chevron-left",
      color: "#E0F7FF99",
      items: [
        "IPO",
        "Trading FAQs",
        "Margin Trading Facility (MTF) and Margins",
        "Charts and orders",
        "Alerts and Nudges",
        "General",
      ],
    },
    {
      id: "funds",
      title: "Funds",
      icon: "fa-solid fa-indian-rupee-sign",
      color: "#E0F7FF99",
      items: ["Add money", "Withdraw money", "Add bank accounts", "eMandates"],
    },
    {
      id: "console",
      title: "Console",
      icon: "fa-solid fa-circle-dot",
      color: "#E0F7FF99",
      items: [
        " Portfolio",
        "Corporate actions",
        "Funds statement",
        "Reports",
        "Profile",
        "Segments",
      ],
    },
    {
      id: "coin",
      title: "Coin",
      icon: "fa-solid fa-coins",
      color: "#E0F7FF99",
      items: [
        "Mutual funds",
        "National Pension Scheme (NPS)",
        "Fixed Deposit (FD)",
        "Features on Coin",
        "Payments and Orders",
        "General",
      ],
    },
  ];

  return (
    <div className="container">
      <div className="row">
        <div className="col-8 px-5">
          {sections.map((section, index) => (
            <div key={section.id} className="mb-4">
              <div
                className="bg-white border"
                style={{ backgroundColor: "#fff" }}
              >
                {/* Header Section */}
                <div
                  className="d-flex align-items-center justify-content-between cursor-pointer"
                  onClick={() => toggleSection(section.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center justify-content-center flex-shrink-0 me-3"
                      style={{
                        backgroundColor: section.color,
                        width: "60px",
                        height: "60px",
                        borderRadius: "0px",
                        border: "none",
                        boxShadow: "none",
                      }}
                    >
                      <i
                        className={`${section.icon} text-blue`}
                        style={{ fontSize: "20px" }}
                      ></i>
                    </div>
                    <h5 className="mb-0 fs-5">{section.title}</h5>
                  </div>
                  <div>
                    <i
                      className={`fa-solid ${
                        expandedSection === section.id
                          ? "fa-chevron-up"
                          : "fa-chevron-down"
                      } text-muted`}
                      style={{ marginRight: "10px" }}
                    ></i>
                  </div>
                </div>

                {/* Expandable Content */}
                {expandedSection === section.id && (
                  <div className="">
                    <hr
                      className="m-0"
                      style={{ borderColor: "#dee2e6", borderWidth: "1px" }}
                    />
                    <div className="ms-5 mt-3">
                      <ul className="list-unstyled">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="mb-3">
                            <a
                              href=" # "
                              className="text-decoration-none text-primary"
                            >
                              • {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="col-4">
          <div
            className="border px-5 py-3"
            style={{ backgroundColor: "#FFF1DC" }}
          >
            <ul>
              <li className="mb-3">
                <a href=" ">
                  Surveillance measure on scrips <br /> - September 2025
                </a>
              </li>
              <li>
                <a href=" ">
                  Rights Entitlements listing in <br /> September 2025
                </a>
              </li>
            </ul>
          </div>

          <div className=" mt-4 border border-1">
            <h6 className="bg-light text-muted mb-3 p-3">Quick links</h6>
            <div>
              <a
                href=" # "
                className="text-decoration-none text-primary d-block mb-3  border-bottom"
              >
                <p className="px-3">1. Track account opening</p>
              </a>
              <a
                href=" # "
                className="text-decoration-none text-primary d-block mb-3 border-bottom"
              >
                <p className="px-3">2. Track segment activation</p>
              </a>
              <a
                href=" # "
                className="text-decoration-none text-primary d-block mb-3 border-bottom"
              >
                <p className="px-3">3. Intraday margins</p>
              </a>
              <a
                href=" # "
                className="text-decoration-none text-primary d-block mb-3 "
              >
                <p className="px-3">4. Kite user manual</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
