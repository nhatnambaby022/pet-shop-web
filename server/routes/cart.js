const express = require("express");
const verifyTokenAdmin = require("../middleware/admin");
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
        //Quantily + 1 if cart is exist
        if (checkExistCart.quantily < checkExistCart.item.quantily) {
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
            const cart = await Cart.find({ user }).populate("item");
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
        //IF cart not exist, add a new cart
        const checkItemExist = await Items.findById(item);
        if (!checkItemExist || checkItemExist.quantily == 0) {
          return res
            .status(400)
            .json({ success: false, message: "Item not found or sold out" });
        } else {
          const newCart = new Cart({
            user,
            item,
            quantily: 1,
          });
          await newCart.save();
          //reuturn new cart
          const cart = await Cart.find({ user }).populate("item");
          if (cart) {
            return res
              .status(200)
              .json({ success: true, message: "Add cart successfull", cart });
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
//Delete all cart of user
router.delete("/", verifyToken, async (req, res) => {
  const user = req.userId;
  try {
    const deletedCart = await Cart.deleteMany({ user });
    if (!deletedCart) {
      return res
        .status(400)
        .json({ success: false, message: "ID not found, delete failed" });
    } else {
      return res.status(200).json({
        success: true,
        message: `Cart has been deleted`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Interval server error" });
  }
});

//DELETE cart with id item and user
router.delete("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const user = req.userId;
  try {
    const deletedCart = await Cart.findOneAndDelete({ user, item: id });
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

router.put("/", verifyToken, async (req, res) => {
  const user = req.userId;
  const { item, quantily } = req.body;
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
      const updated = await Cart.findOneAndUpdate(
        { user, item },
        updateQuantily
      );
      if (updated) {
        return res.status(200).json({
          success: true,
          message: `Cart with ID:${item} has been updated`,
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
    const getCart = await Cart.find({ user: id }).populate("item");
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

//-------------------------------ADMINROUTER------------------------
//GET ALL CART
router.get("/all", verifyTokenAdmin, async (req, res) => {
  try {
    const carts = await Cart.find({}).populate("user").populate("item");
    if (carts)
      return res
        .status(200)
        .json({ success: true, message: "Get all cart successfull!", carts });
    return res.status(400).json({ success: false, message: "Cart not found!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Interval server error" });
  }
});

//delete cart with id cart
router.delete("/admin/:id", verifyTokenAdmin, async (req, res) => {
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

//ADD CART
router.post("/admin", verifyTokenAdmin, async (req, res) => {
  try {
    const { username, itemName, quantily } = req.body;

    //check username exist
    const checkUsername = await Users.find({ username });
    if (checkUsername.length == 0)
      return res
        .status(400)
        .json({ success: false, message: "Username not found" });

    //check item exist
    const checkItem = await Items.find({ itemName });
    if (checkItem.length == 0)
      return res
        .status(400)
        .json({ success: false, message: "Item not found" });

    //get itemId and userId
    const itemId = checkItem[0]._id;
    const userId = checkUsername[0]._id;
    //check cart exist
    const checkCart = await Cart.find({ user: userId, item: itemId });
    if (checkCart.length !== 0)
      return res.status(400).json({ success: false, message: "Cart already!" });

    //check quantily and add cart
    if (quantily > 0 && quantily <= checkItem[0].quantily) {
      const addCart = new Cart({
        user: userId,
        item: itemId,
        quantily,
      });
      await addCart.save();
      return res
        .status(200)
        .json({ success: true, message: "Add cart successfull!" });
    } else {
      return res.status(400).json({
        success: false,
        message: `Quantily must be between 1-${checkItem.quantily}}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Interval server error" });
  }
});
//update cart
router.put("/admin", verifyTokenAdmin, async (req, res) => {
  const { id, quantily } = req.body;
  if (!id || !quantily) {
    return res
      .status(400)
      .json({ message: false, message: "Id or quantily is empty" });
  } else {
    try {
      //check cart
      const cart = await Cart.findById(id).populate("item");
      if (!cart)
        return res
          .status(400)
          .json({ success: false, message: "Cart not found" });

      //check quantily value
      if (quantily < 0 || quantily > cart.item.quantily)
        return res.status(400).json({
          success: false,
          message: `Quantily must between 1-${cart.item.quantily}`,
        });

      // update quantily
      const updated = await Cart.findByIdAndUpdate(id, { quantily });
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
module.exports = router;
