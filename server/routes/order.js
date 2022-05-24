const express = require("express");
const verifyTokenAdmin = require("../middleware/admin");
const verifyToken = require("../middleware/auth");
const Items = require("../models/Items");
const router = express.Router();
const OrderDetail = require("../models/OrderDetail");
const Orders = require("../models/Orders");
const { findById } = require("../models/Users");
const Users = require("../models/Users");

//add order
router.post("/", async (req, res) => {
  const { user, price, receive, items } = req.body;
  if (!user || !price || !receive || !items) {
    return res
      .status(400)
      .json({ success: false, message: "One or more is empty" });
  } else {
    try {
      //add order
      const newOrder = new Orders({
        user,
        price,
        receive,
      });
      await newOrder.save();
      //add orderdetails
      let newOrderDetail;
      await items.forEach(async (element) => {
        newOrderDetail = new OrderDetail({
          order: newOrder._id,
          item: element.item,
          price: element.price,
          quantily: element.quantily,
        });
        await newOrderDetail.save();
      });
      return res.status(200).json({
        success: true,
        message: "Add order successfull",
        newOrder,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Interval server error" });
    }
  }
});

//delete order
router.post("/delete", async (req, res) => {
  const { user, order } = req.body;
  try {
    if (!user || !order) {
      return res
        .status(400)
        .json({ success: false, message: "Id of user or order is empty!" });
    } else {
      //check exsit order
      const orderExist = await Orders.findOne({ _id: order, user });
      if (orderExist) {
        await Orders.findByIdAndDelete(order);
        await OrderDetail.deleteMany({ order });
        return res
          .status(200)
          .json({ success: true, message: "Order deleted!" });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval server error" });
  }
});

//get order by id user
router.get("/", verifyToken, async (req, res) => {
  const userId = req.userId;
  if (userId) {
    try {
      const result = await Orders.find({ user: userId }).populate({
        path: "user",
        select: "-password",
      });
      var orders = [];
      let order;
      let orderDetail;
      if (result) {
        let i;
        for (i = 0; i < result.length; i++) {
          orderDetail = await OrderDetail.find({
            order: result[i]._id,
          });
          order = { ...result[i]._doc, orderDetail: orderDetail };
          orders.push({ ...order });
        }
        return res
          .status(200)
          .json({ success: true, message: "Get order successfull", orders });
      }
      return res
        .status(400)
        .json({ success: false, message: "Order not found!" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Interval server error" });
    }
  }
});

//get order by id
router.get("/:id", async (req, res) => {
  const orderId = req.params.id;
  if (orderId) {
    try {
      const result = await Orders.findById(orderId).populate({
        path: "user",
        select: "-password",
      });

      if (result) {
        const orderDetail = await OrderDetail.find({
          order: result._id,
        }).populate("item");
        const order = { ...result._doc, orderDetail: orderDetail };

        return res
          .status(200)
          .json({ success: true, message: "Get order successfull", order });
      }
      return res
        .status(400)
        .json({ success: false, message: "Order not found!" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Interval server error" });
    }
  }
});

//-----------------------------------ADMIN ROUTER-------------------
//get all order
router.get("/admin/all", verifyTokenAdmin, async (req, res) => {
  try {
    const orders = await Orders.find({}).populate({
      path: "user",
      select: "-password",
    });
    if (orders) {
      return res
        .status(200)
        .json({ success: true, message: "Get order successfull", orders });
    }
    return res
      .status(400)
      .json({ success: false, message: "Order not found!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval server error" });
  }
});

//delete order
router.delete("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Id of user or order is empty!" });
    } else {
      const result = await Orders.findByIdAndDelete(id);
      if (result) {
        await OrderDetail.deleteMany({ order: id });
        return res
          .status(200)
          .json({ success: true, message: "Order deleted!" });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Order not found" });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval server error" });
  }
});

//update order
router.put("/:id", verifyTokenAdmin, async (req, res) => {
  const statusData = ["Wait", "Accept", "Deny", "Delivering", "Done"];
  const _id = req.params.id;
  if (!_id) {
    return res.status(400).json({ success: false, message: "Id is null" });
  }
  const { price, receive, status, note } = req.body;
  if (!price || !receive || !status) {
    return res
      .status(400)
      .json({ success: false, message: "One or more is null" });
  } else {
    if (!statusData.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Status invalid" });
    }
    //check status to update quantily
    const order = await Orders.findById(_id);
    if (order) {
      const update = await Orders.findByIdAndUpdate(_id, {
        price,
        receive,
        status,
        note: note ? note : "",
      });
      if (order.status == "Wait" && status !== "Wait" && status !== "Deny") {
        const orderDetails = await OrderDetail.find({ order: _id });
        if (orderDetails) {
          let update;
          orderDetails.forEach(async (orderDetail) => {
            let item = await Items.findById(orderDetail.item);
            update = await Items.findByIdAndUpdate(orderDetail.item, {
              quantily: item.quantily - orderDetail.quantily,
            });
          });
        }
      }
      if (!update) {
        return res
          .status(400)
          .json({ success: false, message: "One or more is null" });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "Update order sucessfull" });
      }
    }
    //update
  }
});
module.exports = router;
