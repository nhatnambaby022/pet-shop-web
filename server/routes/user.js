const argon2 = require("argon2");
const express = require("express");
const verifyTokenAdmin = require("../middleware/admin");
const verifyToken = require("../middleware/auth");
const Cart = require("../models/Cart");
const Orders = require("../models/Orders");
const router = express.Router();
const Users = require("../models/Users");

//-------------------Public Router----------------
//get user infor by id
router.get("/", verifyToken, async (req, res) => {
  const userId = req.userId;
  try {
    const user = await Users.findById(userId).select("-password");
    return user
      ? res
          .status(200)
          .json({ success: true, message: "Get user infor successfull", user })
      : res.status(400).json({ success: false, message: "User not found" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval server error" });
  }
});
//Update Infor
router.put("/", verifyToken, async (req, res) => {
  const userId = req.userId;
  const { fullname, phone, email, address } = req.body;
  if (!fullname || !phone || !email || !address)
    return res
      .status(400)
      .json({ success: false, message: "One or more is empty!" });
  try {
    const user = await Users.findById(userId);

    const userUpdate = {
      ...user._doc,
      fullname,
      phone,
      email,
      address,
    };
    console.log(userUpdate);
    const update = await Users.findByIdAndUpdate(userId, userUpdate, {
      new: true,
    });
    if (update)
      return res
        .status(200)
        .json({ success: true, message: "Update infor successfull." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval server error" });
  }
});

//update password
router.put("/password", verifyToken, async (req, res) => {
  const userId = req.userId;
  const { password, newPassword } = req.body;
  if (!password || !newPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Newpassword or password is empty." });
  }
  try {
    const user = await Users.findById(userId);
    const validationPassword = await argon2.verify(user.password, password);
    if (!validationPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password!" });
    } else {
      const newPasswordHashed = await argon2.hash(newPassword);
      const userUpdate = { ...user._doc, password: newPasswordHashed };
      const update = await Users.findByIdAndUpdate(userId, userUpdate, {
        new: true,
      });
      if (update)
        return res
          .status(200)
          .json({ success: true, message: "Update password successfull" });
    }
  } catch (error) {
    console.log(error);
    co;
    return res
      .status(500)
      .json({ success: false, message: "Interval server error" });
  }
});
//---------------------------ADMIN ROUTER-------------------
//get all users
router.get("/all", verifyTokenAdmin, async (req, res) => {
  try {
    const users = await Users.find({});
    if (users) {
      return res
        .status(200)
        .json({ success: true, message: "Get all user successfull!", users });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval server error" });
  }
});

//delete user
router.delete("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId) {
      const result = await Users.findByIdAndDelete(userId);
      if (result) {
        await Cart.deleteMany({ user: userId });
        await Orders.deleteMany({ user: userId });
        return res
          .status(200)
          .json({ success: true, message: "Delete user successfull" });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval server error" });
  }
});

//get user by id
router.get("/user/:id", verifyTokenAdmin, async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Users.findById(userId).select("-password");
    return user
      ? res
          .status(200)
          .json({ success: true, message: "Get user infor successfull", user })
      : res.status(400).json({ success: false, message: "User not found" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval server error" });
  }
});

//update
//update user
router.put("/update", verifyTokenAdmin, async (req, res) => {
  const { _id, username, password, fullname, phone, email, address } = req.body;
  try {
    let updateUser = {
      username,
      password,
      fullname: fullname ? fullname : "",
      phone: phone ? phone : "",
      email: email ? email : "",
      address: address ? address : "",
    };
    if (!password) {
      delete updateUser[password];
    } else {
      updateUser.password = await argon2.hash(password);
    }
    const checkId = await Users.findById(_id);
    if (!checkId) {
      return res.status(400).json({ success: false, message: "Id not found" });
    }
    const checkUsername = await Users.find({ username }).select("_id");
    if (checkUsername && checkUsername[0]._id.toString() !== _id) {
      return res
        .status(400)
        .json({ success: false, message: "Username already!" });
    }

    const update = await Users.findByIdAndUpdate(_id, updateUser, {
      new: true,
    });
    if (update) {
      return res
        .status(200)
        .json({ success: true, message: "Update user successfull!" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval server error" });
  }
});
module.exports = router;
