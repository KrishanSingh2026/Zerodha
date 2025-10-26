import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";
import API_URL from "../config";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const { closeBuyWindow, triggerHoldingsRefresh } = useContext(GeneralContext);

  const handleBuyClick = () => {
    // Validate inputs
    if (stockQuantity <= 0) {
      alert("Please enter a valid quantity");
      return;
    }

    if (stockPrice <= 0) {
      alert("Please enter a valid price");
      return;
    }

    console.log("Placing BUY order:", {
      uid,
      qty: stockQuantity,
      price: stockPrice,
    });

    axios
      .post(`${API_URL}/newBuyOrder`, {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "BUY",
      })
      .then((response) => {
        console.log("BUY order response:", response.data);
        closeBuyWindow();
        // Backend updates holdings immediately
        triggerHoldingsRefresh();
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        const errorMsg =
          error.response?.data?.message || "Failed to place buy order";
        alert(errorMsg);
        closeBuyWindow();
      });
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setStockQuantity(value);
  };

  const handlePriceChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setStockPrice(value);
  };

  return (
    <div className="buy-container" id="buy-window" draggable="true">
      <div className="stock-header">
        <h2 className="stock-name">{uid}</h2>
        <span className="stock-label">NSE</span>
      </div>

      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={handleQuantityChange}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              min="0.05"
              onChange={handlePriceChange}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Total: ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
