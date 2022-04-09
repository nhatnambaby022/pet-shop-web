const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemsTypeSchema = new Schema({
  nameType: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("itemtype", itemsTypeSchema);
