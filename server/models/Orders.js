const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Users = require("./Users");

const ordersSchema = new Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Users",
    require: true,
  },
  price: {
    type: Number,
    min: 0,
    require: true,
  },
  receive: {
    type: String,
    require,
  },
  status: {
    type: String,
    enum: ["Wait", "Accept", "Deny", "Delivering", "Done"],
    require: true,
    default: "Wait",
  },
  note: {
    type: String,
  },
  date: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Orders", ordersSchema);
