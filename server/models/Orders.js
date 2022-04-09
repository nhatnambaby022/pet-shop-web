const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Items = require("./Items");
const Users = require("./Users");

const ordersSchema = new Schema({
  items: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Items",
    },
  ],
  status: {
    type: String,
    enum: ["Accept", "Deny"],
  },
  price: {
    type: Number,
    min: 0,
  },
  fullnameReceiver: {
    type: String,
  },
  phoneReceiver: {
    type: String,
  },
  addressReceiver: {
    type: String,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Users",
  },
});
