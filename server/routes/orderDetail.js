const express = require("express");
const verifyTokenAdmin = require("../middleware/admin");
const router = express.Router();
const OrderDetail = require("../models/OrderDetail");
const Users = require("../models/Users");

//get order detail by order id
router.get("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const orderDetail = await OrderDetail.find({ order: orderId }).populate(
      "item"
    );
    if (orderDetail) {
      return res.status(200).json({
        success: true,
        message: "Get order detail successfull",
        orderDetail,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Order detail not found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval server error" });
  }
});

//Update orderdetail
router.put("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const _id = req.params.id;
    const { quantily } = req.body;
    if (_id && quantily) {
      const update = await OrderDetail.findByIdAndUpdate(_id, { quantily });
      if (update) {
        return res
          .status(200)
          .json({ success: true, message: "Orderdetail update successfull" });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Orderdetail not found" });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "One or more is empty" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval server error" });
  }
});

module.exports = router;
