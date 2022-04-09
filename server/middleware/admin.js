const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

const verifyTokenAdmin = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ success: false, message: "Missing token" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await Users.findById(decoded.userId).select("username");
    if (user.username == "admin") {
      next();
    } else {
      return res.status(401).json({ success: false, message: "Not permitted" });
    }
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

module.exports = verifyTokenAdmin;
