const express = require("express");
const verifyTokenAdmin = require("../middleware/admin");
const Items = require("../models/Items");
const router = express.Router();

//PUBLIC ROUTER---------------------------------------
//GET ALL ITEMS
router.get("/", async (req, res) => {
  try {
    const allItems = await Items.find({});
    return res.json({ success: true, message: "All good", allItems });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Get all item is fail" });
  }
});

//Find by name
router.get("/findItems/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const itemsByName = await Items.find({
      itemName: { $regex: name, $options: "i" },
    });
    console.log(itemsByName, name);
    if (itemsByName) {
      return res.status(200).json({
        success: true,
        itemsByName,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval server error" });
  }
});

//ADMIN ROUTER---------------------------------------

// Add item
router.post("/", verifyTokenAdmin, async (req, res) => {
  const {
    itemName,
    quantily,
    priceImport,
    priceExport,
    description,
    pathImage,
    type,
  } = req.body;
  if (!itemName && !quantily && !priceImport && !priceExport && !type) {
    return res
      .status(400)
      .json({ success: false, message: "Item name is null" });
  } else {
    try {
      const checkItem = await Items.findOne({ itemName });
      if (checkItem) {
        return res
          .status(400)
          .json({ success: false, message: "This item is already" });
      } else {
        const newItem = new Items({
          itemName,
          quantily,
          priceImport,
          priceExport,
          description,
          pathImage,
          type,
        });
        await newItem.save();
        return res.json({
          success: true,
          message: "Add item successful",
          newItem,
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

//DELETE item
router.delete("/:id", verifyTokenAdmin, async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ success: false, message: "Id is empty" });
  try {
    const deleted = await Items.findOneAndDelete({ _id: req.params.id });
    if (!deleted)
      return res.status(400).json({ success: true, message: "Id not found" });
    return res.status(200).json({
      success: true,
      message: `Item with Id:${req.params.id} has been deleted`,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval server error" });
  }
});

//UPDATE item
router.put("/:id", verifyTokenAdmin, async (req, res) => {
  const id = req.params.id;
  if (!id)
    return res.status(400).json({ success: false, message: "Id is empty" });
  const {
    itemName,
    quantily,
    priceImport,
    priceExport,
    description,
    pathImage,
    type,
  } = req.body;
  if (!itemName || !quantily || !priceImport || !priceExport || !type) {
    return res.status(400).json({ success: false, message: "Input empty" });
  } else {
    try {
      const updateItem = {
        itemName,
        quantily,
        priceImport,
        priceExport,
        description: description || "",
        pathImage: pathImage || "",
        type,
      };
      const updatedItem = await Items.findOneAndUpdate({ _id: id }, updateItem);
      if (!updatedItem) {
        return res
          .status(400)
          .json({ success: false, message: "Id not found" });
      } else {
        return (
          res.status(200).json({
            success: true,
            message: `Item with Id:${id} hs been updated`,
          }),
          updateItem
        );
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
