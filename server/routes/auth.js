const express = require(`express`);
const router = express.Router();
const Users = require(`../models/Users`);
const agron2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

//POST api/auth/ (Check AuthValidation)
//Public
router.get("/", verifyToken, async (req, res) => {
  try {
    if (req.userId) {
      const user = await Users.findById(req.userId).select("-password");
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User not exist" });
      } else {
        return res.json({ success: true, user });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval server error" });
  }
});

//POST api/auth/register (Register user)
//Public
router.post("/register", async (req, res) => {
  const { username, password, fullname, phone, email, address } = req.body;
  // Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password!" });

  try {
    const user = await Users.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Username already!" });

    //All goood
    const hashedPassword = await agron2.hash(password);
    const newUser = new Users({
      username,
      password: hashedPassword,
      fullname: fullname || "",
      phone: phone || "",
      email: email || "",
      address: address || "",
    });
    await newUser.save();
    return res.json({
      success: true,
      message: "Username created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Interval server error" });
  }
});
//POST api/auth/register (Register user)
//Public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password!" });
  try {
    //Check existing user
    const user = await Users.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password!" });

    // User found
    //Check password Validation
    const passwordValdation = await agron2.verify(user.password, password);
    if (!passwordValdation) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password!" });
    }

    //Return Token cookie
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    const cookie =
      `accessToken=${accessToken}; Max-Age=` + (60 * 60 * 24 * 365).toString();
    return res.json({
      success: true,
      message: "Login successfully",
      cookie,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Interval server error" });
  }
});

module.exports = router;
