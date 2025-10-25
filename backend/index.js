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

// CORS configuration - Allow both ports
app.use(
  cors({
    origin: [
      "http://localhost:3002",
      "http://localhost:3001",
      "http://localhost:3000",
      "https://zerodha-shxy.onrender.com",
      "https://zerodha-7vlo.onrender.com",
      "https://zerodha-dashboard-o6sp.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB Connection
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

// Auth Routes
app.use("/", authRoute);

// Holdings Routes
app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

// Positions Routes
app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

// Buy Order Route
app.post("/newBuyOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

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
  let allOrders = await OrdersModel.find({});
  res.json(allOrders);
});

// Start Server
app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
  console.log("DB connected!");
});
