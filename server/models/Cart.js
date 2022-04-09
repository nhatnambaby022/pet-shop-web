const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Users = require("./Users");
const Items = require("./Items");

const cartSchema = new Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Users",
  },
  item: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Items",
  },
  quantily: {
    type: Number,
    min: 0,
    default: 1,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
