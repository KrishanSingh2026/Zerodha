import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./SellActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [ownedQuantity, setOwnedQuantity] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const { closeSellWindow, triggerHoldingsRefresh } =
    useContext(GeneralContext);

  // Fetch user's holdings to get owned quantity
  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const response = await axios.get("http://localhost:3002/allHoldings");
        const holding = response.data.find((h) => h.name === uid);

        if (holding) {
          setOwnedQuantity(holding.qty);
          setCurrentPrice(holding.price);
          setStockPrice(holding.price);
        } else {
          // Check positions if not in holdings
          const posResponse = await axios.get(
            "http://localhost:3002/allPositions"
          );
          const position = posResponse.data.find((p) => p.name === uid);

          if (position) {
            setOwnedQuantity(position.qty);
            setCurrentPrice(position.price);
            setStockPrice(position.price);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching holdings:", error);
        setLoading(false);
      }
    };

    fetchHoldings();
  }, [uid]);

  const handleSellClick = () => {
    // Validate quantity
    if (stockQuantity <= 0) {
      alert("Please enter a valid quantity");
      return;
    }

    if (stockQuantity > ownedQuantity) {
      alert(`You can only sell up to ${ownedQuantity} shares`);
      return;
    }

    if (stockPrice <= 0) {
      alert("Please enter a valid price");
      return;
    }

    console.log("Placing SELL order:", {
      uid,
      qty: stockQuantity,
      price: stockPrice,
    });

    axios
      .post("http://localhost:3002/newSellOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "Sell",
      })
      .then((response) => {
        console.log("SELL order response:", response.data);
        closeSellWindow();
        // Backend updates holdings immediately
        triggerHoldingsRefresh();
      })
      .catch((error) => {
        console.error("Error placing sell order:", error);
        const errorMsg =
          error.response?.data?.message || "Failed to place sell order";
        alert(errorMsg);
        closeSellWindow();
      });
  };

  const handleCancelClick = () => {
    closeSellWindow();
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    if (value <= ownedQuantity) {
      setStockQuantity(value);
    } else {
      setStockQuantity(ownedQuantity);
    }
  };

  const handlePriceChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setStockPrice(value);
  };

  if (loading) {
    return (
      <div className="sell-container" id="sell-window">
        <div className="stock-header">
          <h2 className="stock-name">{uid}</h2>
          <span className="stock-label">NSE</span>
        </div>
        <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>
      </div>
    );
  }

  if (ownedQuantity === 0) {
    return (
      <div className="sell-container" id="sell-window">
        <div className="stock-header">
          <h2 className="stock-name">{uid}</h2>
          <span className="stock-label">NSE</span>
        </div>
        <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
          You don't own any shares of {uid}
        </div>
        <div className="buttons">
          <div>
            <button className="btn btn-grey" onClick={handleCancelClick}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sell-container" id="sell-window" draggable="true">
      <div className="stock-header">
        <h2 className="stock-name">{uid}</h2>
        <span className="stock-label">NSE</span>
      </div>

      <div className="holdings-info">
        <span>Available: {ownedQuantity} shares</span>
        <span>Current Price: ₹{currentPrice}</span>
      </div>

      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty. (Max: {ownedQuantity})</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              max={ownedQuantity}
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
          <button className="btn btn-red" onClick={handleSellClick}>
            Sell
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
