require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./user_authentication/server/Routes/AuthRoute");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(
  cors({
    origin: [
      // Local development
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      // Production - ALL deployed apps
      "https://zerodha-shxy.onrender.com",
      "https://zerodha-7vlo.onrender.com",
      "https://zerodha-dashboard-o6sp.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Handle preflight OPTIONS requests
app.options("*", cors());

// Body parsers - AFTER CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging middleware
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.path} - Origin: ${req.headers.origin || "none"}`
  );
  next();
});

// MongoDB Connection
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Test endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Zerodha Backend API is running",
    timestamp: new Date().toISOString(),
  });
});

// Auth Routes
app.use("/", authRoute);

// Holdings Routes
app.get("/allHoldings", async (req, res) => {
  try {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (error) {
    console.error("Error fetching holdings:", error);
    res.status(500).json({ error: error.message });
  }
});

// Positions Routes
app.get("/allPositions", async (req, res) => {
  try {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (error) {
    console.error("Error fetching positions:", error);
    res.status(500).json({ error: error.message });
  }
});

// Buy Order Route
app.post("/newBuyOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    if (!name || !qty || !price || !mode) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let newOrder = new OrdersModel({
      name,
      qty,
      price,
      mode,
    });
    await newOrder.save();

    let holding = await HoldingsModel.findOne({ name });

    if (holding) {
      const totalQty = holding.qty + parseInt(qty);
      const totalCost =
        holding.avg * holding.qty + parseFloat(price) * parseInt(qty);
      const newAvg = totalCost / totalQty;

      holding.qty = totalQty;
      holding.avg = newAvg;
      holding.price = parseFloat(price);
      await holding.save();
    } else {
      let newHolding = new HoldingsModel({
        name,
        qty: parseInt(qty),
        avg: parseFloat(price),
        price: parseFloat(price),
        net: "+0.00%",
        day: "+0.00%",
        isLoss: false,
      });
      await newHolding.save();
    }

    res.json({
      success: true,
      message: "Buy order placed and holdings updated!",
      holding: await HoldingsModel.findOne({ name }),
    });
  } catch (error) {
    console.error("Error in buy order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Sell Order Route
app.post("/newSellOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    if (!name || !qty || !price || !mode) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let holding = await HoldingsModel.findOne({ name });

    if (!holding) {
      return res.status(400).json({
        success: false,
        message: "You don't own this stock",
      });
    }

    if (holding.qty < parseInt(qty)) {
      return res.status(400).json({
        success: false,
        message: `Insufficient quantity. You only have ${holding.qty} shares`,
      });
    }

    let newSellOrder = new OrdersModel({
      name,
      qty,
      price,
      mode,
    });
    await newSellOrder.save();

    const newQty = holding.qty - parseInt(qty);

    if (newQty === 0) {
      await HoldingsModel.deleteOne({ name });
    } else {
      holding.qty = newQty;
      holding.price = parseFloat(price);
      await holding.save();
    }

    res.json({
      success: true,
      message: "Sell order placed and holdings updated!",
      holding: newQty > 0 ? await HoldingsModel.findOne({ name }) : null,
    });
  } catch (error) {
    console.error("Error in sell order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// All Orders Route
app.get("/allOrders", async (req, res) => {
  try {
    let allOrders = await OrdersModel.find({});
    res.json(allOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.path,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
