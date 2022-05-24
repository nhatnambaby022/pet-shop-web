const express = require(`express`);
const verifyTokenAdmin = require("../middleware/admin");
const Cart = require("../models/Cart");
const Items = require("../models/Items");
const router = express.Router();
const ItemType = require(`../models/ItemsType`);
const OrderDetail = require("../models/OrderDetail");

//PUBLIC ROUTER

//GET ALL TYPES
router.get("/", async (req, res) => {
  try {
    const itemtypes = await ItemType.find({});
    if (!itemtypes) {
      return res
        .status(400)
        .json({ success: false, message: "Items not found or empty" });
    } else {
      return res.status(200).json({ success: true, itemtypes });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval server error" });
  }
});

//ADMIN ROUTER--------------

//get itemtypes by id
router.get("/:id", verifyTokenAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    const type = await ItemType.findById(id);
    if (type)
      return res.status(200).json({
        success: true,
        message: "Get item type by id successfull!",
        type,
      });

    return res
      .status(400)
      .json({ success: false, message: "Item type not found" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval server error" });
  }
});
//POST add itemtype router
router.post("/", verifyTokenAdmin, async (req, res) => {
  const { nameType } = req.body;
  if (!nameType) {
    return res
      .status(400)
      .json({ success: false, message: "Name type is null" });
  } else {
    try {
      const itemtype = await ItemType.findOne({ nameType });
      if (itemtype) {
        return res
          .status(400)
          .json({ success: false, message: "Type item is already" });
      } else {
        const newItemType = new ItemType({
          nameType,
        });
        newItemType.save();
        return res.json({ success: true, newItemType });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Interval server error" });
    }
  }
});

//Router delete type
router.delete("/:id", verifyTokenAdmin, async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ success: false, message: "ID is null!" });
  } else {
    try {
      const deleteType = await ItemType.findOneAndDelete({
        _id: id,
      });
      if (!deleteType) {
        return res
          .status(400)
          .json({ success: false, message: "ID not found!" });
      } else {
        const items = await Items.find({ type: id });
        if (items.length != 0) {
          await Items.deleteMany({ type: id });
          items.forEach(async (item) => {
            await OrderDetail.deleteMany({ item: item._id });
            await Cart.deleteMany({ item: item._id });
          });
        }
        return res.json({
          success: true,
          message: `Type with Id:${id} has been deleted`,
        });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Interval server error" });
    }
  }
});

//Router update type
router.put("/:id", verifyTokenAdmin, async (req, res) => {
  const { nameType } = req.body;
  //Check validation
  if (!nameType || !req.params.id) {
    return res
      .status(400)
      .json({ success: false, message: "ID or name type is null" });
  } else {
    //Validation not null
    try {
      const updateType = await ItemType.findOneAndUpdate(
        { _id: req.params.id },
        { nameType },
        { new: true }
      );
      if (!updateType) {
        return res
          .status(400)
          .json({ success: false, message: "Type ID not found" });
      } else {
        return res.json({
          success: true,
          message: `Update type with ID:${req.params.id} successful`,
          nameType,
        });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Interval server error" });
    }
  }
});

module.exports = router;
