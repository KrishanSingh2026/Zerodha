const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ status: false });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.json({ status: false });
    }

    try {
      const user = await User.findById(data.id);
      if (user) {
        return res.json({
          status: true,
          user: user.username,
        });
      } else {
        return res.json({ status: false });
      }
    } catch (error) {
      console.error("User fetch error:", error);
      return res.json({ status: false });
    }
  });
};
