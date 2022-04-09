const express = require("express");
const verifyToken = require("../middleware/auth");
const Cart = require("../models/Cart");
const Items = require("../models/Items");
const Users = require("../models/Users");
const router = express.Router();

//CUSTOMER ROUTER-------------------------------

//ADD to cart
router.post("/", verifyToken, async (req, res) => {
  const user = req.userId;
  const { item } = req.body;
  if (!item) {
    return res.status(400).json({ success: false, message: "Item is null" });
  } else {
    try {
      const checkExistCart = await Cart.findOne({
        user,
        item,
      }).populate("item", ["quantily"]);
      if (checkExistCart) {
        if (checkExistCart.quantily + 1 <= checkExistCart.item.quantily) {
          const itemUpdate = {
            user,
            item,
            quantily: checkExistCart.quantily + 1,
          };
          const updateQuantily = await Cart.findOneAndUpdate(
            { user, item },
            itemUpdate
          );
          if (updateQuantily) {
            //return cart of user
            console.log("a");
            const cart = await Cart.find({ user }).populate("item", [
              "itemName",
              "priceExport",
            ]);
            if (cart) {
              return res.status(200).json({ success: true, cart });
            } else {
              return res
                .status(400)
                .json({ success: false, message: "Cart load failed" });
            }
          } else {
            return res
              .status(400)
              .json({ success: false, message: "Quantily update failed" });
          }
        } else {
          return res
            .status(400)
            .json({ success: false, message: "Sold out already" });
        }
      } else {
        const checkItemExist = await Items.findById(item);
        if (!checkItemExist || checkItemExist.quantily == 0) {
          return res
            .status(400)
            .json({ success: false, message: "Item not found or sold out" });
        } else {
          const newCart = new Cart({
            user,
            item,
          });
          await newCart.save();
          const cart = await Cart.find({ user });
          if (cart) {
            return res
              .status(200)
              .json({ success: true, cart })
              .populate("item", ["itemName", "priceExport"]);
          } else {
            return res
              .status(400)
              .json({ success: false, message: "Cart load failed" });
          }
        }
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Interval server error" });
    }
  }
});

//DELETE cart

router.delete("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  try {
    const deletedCart = await Cart.findByIdAndDelete(id);
    if (!deletedCart) {
      return res
        .status(400)
        .json({ success: false, message: "ID not found, delete failed" });
    } else {
      return res.status(200).json({
        success: true,
        message: `Cart with ID: ${id} has been deleted`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Interval server error" });
  }
});

//Update cart

router.put("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const { user, item, quantily } = req.body;
  if (!user || !item || !quantily) {
    return res
      .status(400)
      .json({ message: false, message: "user, item or quantily is empty" });
  } else {
    try {
      const updateQuantily = {
        user,
        item,
        quantily,
      };
      const updated = await Cart.findByIdAndUpdate(id, updateQuantily);
      if (updated) {
        return res.status(200).json({
          success: true,
          message: `Cart with ID:${id} has been updated`,
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Cart not found" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Interval server error" });
    }
  }
});

//GET cart with ID user
router.get("/", verifyToken, async (req, res) => {
  try {
    const id = req.userId;
    const getCart = await Cart.find({ user: id });
    if (!getCart) {
      return res
        .status(400)
        .json({ success: false, message: `Cart with userId:${id} not found` });
    } else {
      return res.status(200).json({ success: true, getCart });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Interval server error" });
  }
});
module.exports = router;
