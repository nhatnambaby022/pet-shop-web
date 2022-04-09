const mongoose = require(`mongoose`);
const itemtype = require("./ItemsType");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  itemName: {
    type: String,
    required: true,
    unique: true,
  },
  quantily: {
    type: Number,
    min: 0,
    required: true,
  },
  priceImport: {
    type: Number,
    min: 0,
    required: true,
  },
  priceExport: {
    type: Number,
    min: 0,
    required: true,
  },

  description: {
    type: String,
  },
  pathImage: {
    type: String,
    required: true,
  },
  type: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "itemtype",
    unique: true,
  },
});

module.exports = mongoose.model("Items", ItemSchema);
