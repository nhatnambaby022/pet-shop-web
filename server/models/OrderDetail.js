const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Orders = require("./Orders");
const Items = require("./Items");

const orderDetailSchema = new Schema({
  order: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Orders",
    require,
  },
  item: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Items",
    require,
  },
  price: {
    type: Number,
    min: 0,
  },
  quantily: {
    type: Number,
    min: 0,
    default: 1,
    require,
  },
});

module.exports = mongoose.model("OrderDetail", orderDetailSchema);
